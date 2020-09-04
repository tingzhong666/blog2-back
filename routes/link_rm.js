const router = require('express').Router(),
  { link } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 友链删除
router.post('/link_rm', check, async (req, res) => {
  const id = req.body.id || null

  if (id === null) {
    res.send({
      code: 0,
      msg: 'id参数未传或为空',
      data: {}
    })
    return
  }

  // id效验
  if (!idCheck(id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }

  const doc = await link.findByIdAndDelete(id).exec()
  if (doc === null) {
    res.send({
      code: 0,
      msg: 'id找不到',
      data: {}
    })
    return
  }

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
