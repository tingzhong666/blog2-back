const router = require('express').Router(),
  { complain, admin } = require('../models'),
  idCheck = require('../tools/idCheck'),
  news = require('../tools/news'),
  auth = require('../tools/auth')

// 吐槽评论新增
router.post('/complain_reply_add', async (req, res) => {
  // 必须参数
  const body = {
    id: req.body.id,
    name: req.body.name || null,
    content: req.body.content || null
  },
    // 可选
    body2 = {
      comment_id: req.body.comment_id || null,
      contact: req.body.contact || null,
      email: req.body.email || null
    },
    token = req.body.token || req.query.token || null

  for (let k in body) {
    if (body[k] === null) {
      res.send({
        code: 0,
        msg: k + '参数未传',
        data: {}
      })
      return
    }
  }

  if (!idCheck(body.id)) {
    res.send({
      code: 0,
      msg: '吐槽id错误',
      data: {}
    })
    return
  }

  const docs = await complain.find({ _id: body.id }).exec()
  if (!docs.length) {
    res.send({
      code: 0,
      msg: '吐槽id找不到',
      data: {}
    })
    return
  }

  // 是否管理员 1 管理员 10 游客
  let level = 1
  if (token === null || !auth(token)) level = 10
  // 昵称
  let  name = (await admin.find().exec())[0].intro.name
  name = level === 10 ? body.name : name

  if (body2.comment_id !== null) {
    // 二维回复
    if (!idCheck(body2.comment_id)) {
      res.send({
        code: 0,
        msg: '吐槽评论comment_id错误',
        data: {}
      })
      return
    }

    const replies = await docs[0].comment.id(body2.comment_id)
    if (replies === null) {
      res.send({
        code: 0,
        msg: '吐槽评论comment_id一维评论id找不到',
        data: {}
      })
      return
    }
  }

  // 一维评论
  docs[0].comment.push({
    name,
    content: body.content,
    contact: body2.contact,
    email: body2.email,
    reply_id: body2.comment_id,
    level
  })

  docs[0].save()

  // 消息新增
  news({
    n: 3,
    content: body.content,
    title: docs.content,
    originalId: body.id
  })

  res.send({
    code: 1,
    data: {}
  })
})


module.exports = router
