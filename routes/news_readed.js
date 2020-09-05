const router = require('express').Router(),
  { news } = require('../models'),
  check = require('../middlewares/check'),
  idCheck = require('../tools/idCheck')

// 消息标记已读
router.get('/news_readed', check, async (req, res) => {
  const id = req.query.id || null

  if (id == 0) await news.updateMany({ is_readed: false }, { is_readed: true }).exec()
  else {
    if (!idCheck(id)) {
      res.send({
        code: 0,
        msg: 'id错误',
        data: {}
      })
      return
    }

    const result = await news.findByIdAndUpdate(id, { is_readed: true }).exec()
    if (result === null) {
      res.send({
        code: 0,
        msg: 'id找不到',
        data: {}
      })
      return
    }
  }

  res.send({
    code: 1,
    data: {}
  })
})


module.exports = router
