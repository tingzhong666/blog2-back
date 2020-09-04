const router = require('express').Router(),
  { admin, link_apply: linkApply } = require('../models'),
  auth = require('../tools/auth'),
  idCheck = require('../tools/idCheck')

// 友链申请新增
router.post('/link_apply', async (req, res) => {
  // 必须参数
  const body = {
    name: req.body.name || null,
    content: req.body.content || null
  },
    // 可选
    body2 = {
      comment_id: req.body.comment_id || null,
      reply_id: req.body.reply_id || null,
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

  // 是否管理员 1 管理员 10 游客
  let level = 1
  if (token === null || !auth(token)) level = 10
  // 昵称
  let  name = (await admin.find().exec())[0].intro.name
  name = level === 10 ? body.name : name

  // 一维评论
  if (body2.comment_id === null) {
    const doc = new linkApply({
      name,
      content: body.content,
      contact: body2.contact,
      email: body2.email,
      level
    })
    doc.save()
  } else {
    // 二维回复
    if (!idCheck(body2.comment_id)) {
      res.send({
        code: 0,
        msg: 'comment_id一维评论id错误',
        data: {}
      })
      return
    }
    if (body2.reply_id !== null && !idCheck(body2.reply_id)) {
      res.send({
        code: 0,
        msg: 'reply_id二维评论id错误',
        data: {}
      })
      return
    }

    const replies = await linkApply.findById(body2.comment_id)
    if (replies === null) {
      res.send({
        code: 0,
        msg: 'comment_id一维评论id找不到',
        data: {}
      })
      return
    }

    if (body2.reply_id !== null) {
      const replies2 = await replies.reply.id(body2.reply_id)
      if (replies2 === null) {
        res.send({
          code: 0,
          msg: 'reply_id二维评论id找不到',
          data: {}
        })
        return
      }
    }

    replies.reply.push({
      name,
      contact: body2.contact,
      email: body2.email,
      content: body.content,
      reply_id: body2.reply_id,
      level
    })

    replies.save()
  }

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
