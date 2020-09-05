const router = require('express').Router(),
  { complain } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 吐槽评论删除
router.get('/complain_reply_rm', check, async (req, res) => {
  const body = {
    id: req.query.id || null,
    comment_id: req.query.comment_id || null
  }

  for (let k in body) {
    if (body[k] === null) {
      res.send({
        code: 0,
        msg: k + '参数未传或为空',
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

  if (!idCheck(body.comment_id)) {
    res.send({
      code: 0,
      msg: 'comment_id吐槽评论id错误',
      data: {}
    })
    return
  }

  const docs = await complain.find({ _id: body.id })
  if (!docs.length) {
    res.send({
      code: 0,
      msg: '吐槽id找不到',
      data: {}
    })
    return
  }
  
  const comment = await docs[0].comment.id(body.comment_id)
  if (comment === null) {
    res.send({
      code: 0,
      msg: 'comment_id吐槽评论id找不到',
      data: {}
    })
    return
  }
  comment.remove()
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
