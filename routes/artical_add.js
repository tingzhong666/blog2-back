const router = require('express').Router(),
  { artical } = require('../models'),
  check = require('../middlewares/check')

// 文章新增
router.post('/artical_add', check, async (req, res) => {
  const body = {
    title: req.body.title || null,
    intro: req.body.intro || null,
    content: req.body.content || null,
    is_reward: req.body.is_reward || null,
    is_private: req.body.is_private || null,
    is_top: req.body.is_top || null
  },
    body2 = {
      tag_id: req.body.tag_id ? JSON.parse(req.body.tag_id) : [],
      img: req.body.img || null
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

  const doc = new artical({
    title: body.title,
    img: body2.img,
    tag_id: body2.tag_id,
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
