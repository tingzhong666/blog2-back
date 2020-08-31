const router = require('express').Router(),
  { admin } = require('../models'),
  check = require('../middlewares/check')

// 博主信息设置
router.post('/intro', check, async (req, res) => {
  const body = {
    img: req.body.img || null,
    name: req.body.name || null,
    intro: req.body.intro || null,
    github: req.body.github || null,
  }

  let docs = await admin.find().exec()
  for(let k in body) {
    // 没有值 则跳过
    if(body[k] === null) continue

    docs[0].intro[k] = body[k]
  }
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
