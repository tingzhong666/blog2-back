const router = require('express').Router(),
  { link } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 友链修改
router.post('/link_modify', check, async (req, res) => {
  const body = {
    id: req.body.id || null,
    name: req.body.name || null,
    url: req.body.url || null
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

  // id效验
  if (!idCheck(body.id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }
  const doc = await link.findById(body.id).exec()
  if (doc === null) {
    res.send({
      code: 0,
      msg: 'id找不到',
      data: {}
    })
    return
  }

  // 查重
  let docs = await link.find({ name: body.name }).exec()
  if (docs.length) {
    res.send({
      code: 0,
      msg: '友链昵称已存在',
      data: {}
    })
    return
  }
  docs = await link.find({ link: body.url }).exec()
  if (docs.length) {
    res.send({
      code: 0,
      msg: '友链url地址已存在',
      data: {}
    })
    return
  }

  // 修改
  doc.name = body.name
  doc.link = body.url
  doc.save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
