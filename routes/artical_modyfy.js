const router = require('express').Router(),
  { artical } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 文章修改
router.post('/artical_modify', check, async (req, res) => {
  const body = {
    id: req.body.id || null,
    title: req.body.title || null,
    intro: req.body.intro || null,
    content: req.body.content || null,
    img: req.body.img || null,
    tag_id: req.body.tag_id || null,
    is_reward: req.body.is_reward || null,
    is_private: req.body.is_private || null,
    is_top: req.body.is_top || null
  }

  for (let k in body) {
    // tag_id 参数是可选的
    if (body[k] === null && k != 'tag_id') {
      res.send({
        code: 0,
        msg: k + '参数未传或为空',
        data: {}
      })
      return
    }
  }

  if (!idCheck(body.id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
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

  for (let k in body) {
    if (k === 'tag_id') {
      docs[0].tag_id = body.tag_id || []
      continue
    }
    if (k === 'id') continue
    docs[0][k] = body[k]
  }
  docs[0].save()
  
  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
