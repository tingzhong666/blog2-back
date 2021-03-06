const router = require('express').Router(),
  { artical } = require('../models'),
  idCheck = require('../tools/idCheck'),
  check = require('../middlewares/check')

// 文章评论删除
router.get('/comment_rm', check, async (req, res) => {
  // 必须参数
  const body = {
    id: req.query.id || null,
    comment_id: req.query.comment_id || null
  },
    // 可选
    body2 = {
      reply_id : req.query.reply_id  || null
    }

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
      msg: '文章id错误',
      data: {}
    })
    return
  }

  if (!idCheck(body.comment_id)) {
    res.send({
      code: 0,
      msg: 'comment_id一维评论id错误',
      data: {}
    })
    return
  }

  const docs = await artical.find({ _id: body.id })
  if (!docs.length) {
    res.send({
      code: 0,
      msg: '文章id找不到',
      data: {}
    })
    return
  }
  
  const comment = await docs[0].comment.id(body.comment_id)
  if (comment === null) {
    res.send({
      code: 0,
      msg: 'comment_id一维评论id找不到',
      data: {}
    })
    return
  }
  // 一维评论
  if (body2.reply_id === null) comment.remove()
  else {
    // 二维回复
    if (!idCheck(body2.reply_id)) {
      res.send({
        code: 0,
        msg: 'reply_id二维评论id错误',
        data: {}
      })
      return
    }

    const reply = await comment.reply.id(body2.reply_id)
    if (reply === null) {
      res.send({
        code: 0,
        msg: 'reply_id二维评论id找不到',
        data: {}
      })
      return
    }

    reply.remove()
  }
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
