const router = require('express').Router(),
  { tag } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 标签修改
router.post('/tag_modify', check, async (req, res) => {
  const body = {
    name: req.body.name || null,
    id: req.body.id || null
  }
  // 参数不完整
  for(let k in body) {
    if(body[k] === null) {
      res.send({
        code: 0,
        msg: k + '参数未传或为空',
        data: {}
      })
      return
    }
  }

  // id是否正确
  if (!idCheck(body.id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }
  
  // 查重
  const docss = await tag.find({ tag_name: body.name }).exec()
  if (docss.length) {
    res.send({
      code: 0,
      msg: '标签名重复',
      data: {}
    })
    return
  }
  
  const docs = await tag.find({ _id: body.id }).exec()
  if (!docs.length) {
    res.send({
      code: 0,
      msg: '找不到此id',
      data: {}
    })
    return
  }
  docs[0].tag_name = body.name
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
