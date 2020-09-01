const router = require('express').Router(),
  { set } = require('../models')

// 关于说明获取
router.get('/about', async (rqe, res) => {
  const docs = await set.find().exec()
  res.send({
    code: 1,
    data: docs[0].about
  })
})

module.exports = router
