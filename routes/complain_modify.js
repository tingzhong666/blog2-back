const router = require('express').Router(),
  { complain } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 吐槽修改
router.post('/complain_modify', check, async (req, res) => {
  const body = {
    id: req.body.id || null,
    content: req.body.content || null
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
  const doc = await complain.findById(body.id).exec()
  if (doc === null) {
    res.send({
      code: 0,
      msg: 'id找不到',
      data: {}
    })
    return
  }

  doc.content = body.content
  doc.save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
