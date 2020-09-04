const router = require('express').Router(),
  { set } = require('../models')

// 友链申请条件获取
router.get('/link_apply_condition', async (req, res) => {
  const docs = await set.find().exec()
  res.send({
    code: 1,
    data: {
      content: docs[0].link_apply
    }
  })
})

module.exports = router
