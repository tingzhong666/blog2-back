const router = require('express').Router(),
  { tag } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 标签删除
router.get('/tag_rm', check, async (req, res) => {
  const id = req.query.id || null
  if (id === null) {
    res.send({
      code: 0,
      msg: 'id未传或为空',
      data: {}
    })
    return
  }

  // id错误
  if (!idCheck(id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }

  const docs = await tag.find({ _id: id }).deleteMany().exec()

  // 找不到id
  if (docs.n == 0) {
    res.send({
      code: 0,
      msg: '找不到此id',
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
