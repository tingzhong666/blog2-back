const router = require('express').Router(),
  { artical } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require("../tools/idCheck")

// 文章删除
router.get('/artical_rm', check, async (req, res) => {
  const id = req.query.id || null

  if (id === null) {
    res.send({
      code: 0,
      msg: 'id参数未传或为空',
      data: {}
    })
    return
  }

  if (!idCheck(id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }

  const docs = await artical.find({ _id: id }).deleteMany().exec()
  if (docs.n == 0) {
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
