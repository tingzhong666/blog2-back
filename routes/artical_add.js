const router = require('express').Router(),
  { artical } = require('../models'),
  check = require('../middlewares/check')

// 文章新增
router.post('/artical_add', check, async (req, res) => {
  const body = {
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

  const doc = new artical({
    title: body.title,
    img: body.img,
    tag_id: body.tag_id === null ? [] : body.tag_id,
    intro: body.intro,
    is_reward: body.is_reward,
    is_private: body.is_private,
    is_top: body.is_top,
    content: body.content
  })
  doc.save()
  
  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
