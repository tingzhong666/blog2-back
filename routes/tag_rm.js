const router = require('express').Router(),
  { tag, artical } = require('../models'),
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

  // 删除含有此标签的文章的标签
  const lists = await artical.find({ tag_id: id }).exec()
  lists.forEach(v => {
    let i = v.tag_id.indexOf(id)
    v.tag_id.splice(i, 1)
    v.save()
  })


  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
