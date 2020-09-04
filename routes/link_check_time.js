const router = require('express').Router(),
  { set } = require('../models')

// 友链检测时间获取
router.get('/link_check_time', async (req, res) => {
  const docs = await set.find().exec()
  res.send({
    code: 1,
    data: {
      time: docs[0].link_check_time,
      date: docs[0].link_update_check
    }
  })
})

module.exports = router
