const router = require('express').Router(),
  { artical } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 文章赞赏设置修改
router.post('/reward', check, async (req, res) => {
  const body = {
    id: req.body.id || null,
    switch: req.body.switch || null
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

  // id检测
  if (!idCheck(body.id)) {
    res.send({
      code: 0,
      msg: 'id错误',

    })
    return
  }

  const docs = await artical.find({ _id: body.id }).exec()
  if (!docs.length) {
    res.send({
      code: 0,
      msg: '找不到此id',
      data: {}
    })
    return
  }

  docs[0].is_reward = body.switch
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
