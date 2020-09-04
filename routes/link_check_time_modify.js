const router = require('express').Router(),
  { set } = require('../models'),
  check = require('../middlewares/check')

// 友链检测时间设置
router.post('/link_check_time_modify', check, async (req, res) => {
  const time = req.body.time || null

  if (time === null) {
    res.send({
      code: 0,
      msg: 'time参数未传或为空',
      data: {}
    })
    return
  } else if (time <= 60*1000) {
    res.send({
      code: 0,
      msg: '间隔必须大于60s',
      data: {}
    })
    return
  }

  const docs = await set.find().exec()
  docs[0].link_check_time = time
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
