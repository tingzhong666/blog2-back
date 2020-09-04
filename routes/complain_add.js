const router = require('express').Router(),
  { complain } = require('../models'),
  check = require('../middlewares/check')

// 吐槽新增
router.post('/complain_add', check, async (req, res) => {
  const content = req.body.content || null

  if (content === null) {
    res.send({
      code: 0,
      msg: 'content参数未传或为空',
      data: {}
    })
    return
  }

  const doc = new complain({ content })
  doc.save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
