const router = require('express').Router(),
  { link } = require('../models'),
  check = require('../middlewares/check')

// 友链新增
router.post('/link_add', check, async (req, res) => {
  const body = {
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

  const doc = new link({
    name: body.name,
    link: body.url,
    is_valid: true
  })
  doc.save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
