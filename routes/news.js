const router = require('express').Router(),
  { news } = require("../models"),
  check = require('../middlewares/check'),
  idCheck = require("../tools/idCheck")

// 消息获取
router.get('/news', check, async (req, res) => {
  const body = {
    q: req.query.q || null,
    news_class: req.query.news_class || 0,
    page: req.query.page || 1,
    limit: req.query.limit || 10
  }

  // 条件
  let condition, condition1, condition2

  // 关键词
  if (body.q === null) condition1 = 'true'
  else condition1 = `(/${body.q}/i.test(this.content) || /${body.q}/i.test(this.title))`

  // 分类
  if (body.news_class === 0) condition2 = 'true'
  else {
    if (!idCheck(body.news_class)) {
      res.send({
        code: 0,
        msg: 'news_class消息分类id错误',
        data: {}
      })
      return
    }

    const doc = await msg.findById(body.news_class)
    if (comment === null) {
      res.send({
        code: 0,
        msg: 'news_class消息分类id找不到',
        data: {}
      })
      return
    }

    condition2 = `this.class_id === ${body.news_class}`
  }

  condition = condition1 + '&&' + condition2

  const docs = await news.$where(condition).exec()

  // 分页
  docs.sort((a, b) => b.time_now - a.time_now)
  let startIndex = (body.page - 1) * body.limit,
    endIndex = body.page * body.limit
  let data = docs.slice(startIndex, endIndex)

  // 参数处理
  data = data.map(async v => {
    return {
      content: v.content,
    	calss: v.class_id,
      created_time: v.time_now,
      is_raeded: v.is_raeded,
      original_id: v.original_id
    }
  })
  const readed = await docs.find({ is_readed: true }).exec()

  res.send({
    code: 1,
    count: docs.length,
    readed: readed.length,
    data: []
  })
})

module.exports = router
