const router = require('express').Router(),
  { tag } = require('../models'),
  check = require('../middlewares/check')

// 标签新增
router.post('/tag_add', check, async (req, res) => {
  const tag_name = req.body.name || null
  if (tag_name === null) {
    res.send({
      code: 0,
      msg: '参数未传或为空',
      data: {}
    })
    return
  }

  // 查重
  const docs = await tag.find({ tag_name }).exec()
  if (docs.length) {
    res.send({
      code: 0,
      msg: '已有此标签',
      data: {}
    })
    return
  }

  // 新增
  const doc = new tag({ tag_name: tag_name })
  doc.save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
