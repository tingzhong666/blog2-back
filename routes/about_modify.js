const router = require('express').Router(),
  { set } = require('../models'),
  check = require('../middlewares/check')

// 关于说明修改
router.post('/about', check, async (req, res) => {
  const content = req.body.content || null

  if (content === null) {
    res.send({
      code: 0,
      msg: 'content参数未传或为空',
      data: {}
    })
    return
  }

  const docs = await set.find().exec()
  docs[0].about = content
  docs[0].save()
  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
