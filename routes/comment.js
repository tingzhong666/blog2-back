const router = require('express').Router(),
  { artical } = require('../models'),
  idCheck = require('../tools/idCheck')

// 评论获取
router.get('/comment', async (req, res) => {
  const id = req.query.id || null,
    body = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    }

  if (id === null) {
    res.send({
      code: 0,
      msg: 'id参数未传',
      data: {}
    })
    return
  }

  if (!idCheck(id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }

  const docs = await artical.find({ _id: id }).exec()
  if (!docs.length) {
    res.send({
      code: 0,
      msg: 'id找不到',
      data: {}
    })
    return
  }

  let data = []
  // 排序 时间倒序
  docs[0].comment.sort((a, b) => b.time_now - a.time_now)

  // -1 时 返回全部
  if (body.limit == -1) data = docs[0].comment
  else {
    // 截取部分
    for (let i = 0; i < body.limit; i++) {
      // 按page指定页数开始
      let index = (body.page - 1) * body.limit + i
      
      // 如果本页 回复 不足 limit 条数 直接中断
      if (index + 1 > docs[0].comment.length) break

      data.push(docs[0].comment[index])
    }
  }

  res.send({
    code: 1,
    data
  })
})

module.exports = router
