const router = require('express').Router(),
  { complain } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 吐槽删除
router.get('/complain_rm', check, async (req, res) => {
  const body = {
    id: req.query.id || null,
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
  const doc = await complain.findByIdAndDelete(body.id).exec()
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
