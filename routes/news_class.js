const router = require('express').Router(),
  { news_class: newsClass } = require('../models'),
  check = require('../middlewares/check')

// 消息分类获取
router.get('/news_class', check, async (req, res) => {
  const docs = await newsClass.find().exec()
  let data = docs.map(v => {
    return {
      name: v.name,
      id: v._id
    }
  })

  res.send({
    code: 1,
    data
  })
})

module.exports = router
