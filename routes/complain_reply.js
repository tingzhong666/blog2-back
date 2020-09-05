const router = require('express').Router(),
  { complain } = require('../models')

// 吐槽评论获取
router.get('/complain_reply', async (req, res) => {
  const id = req.query.id || null
  if (id === null) {
    res.send({
      code: 0,
      msg: '吐槽id未传或为空',
      data: {}
    })
    return
  }

  const doc = await complain.findById(id).exec()
  if (doc === null) {
    res.send({
      code: 0,
      msg: '吐槽id找不到',
      data: {}
    })
    return
  }

  let data = doc.comment.map(async v => {
    let reply_name = doc.comment.id(v.reply_id)
    if (reply_name !== null) reply_name = reply_name.name

    return {
      id: v.id,
      name: v.name,
      contact: v.contact,
      email: v.email,
      content: v.content,
      created_time: v.time_now,
      reply_id: v.reply_id,
      reply_name,
      level: v.level
    }
  })
  data = await Promise.all(data)

  res.send({
    code: 1,
    data
  })
})

module.exports = router
