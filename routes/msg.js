const router = require('express').Router(),
  { msg } = require('../models')

// 留言获取
router.get('/msg', async (req, res) => {
  const body = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    }

  const docs = await msg.find().exec()

  let data = []
  // 排序 时间倒序
  docs.sort((a, b) => b.time_now - a.time_now)

  // -1 时 返回全部
  if (body.limit == -1) data = docs
  else {
    // 截取部分
    for (let i = 0; i < body.limit; i++) {
      // 按page指定页数开始
      let index = (body.page - 1) * body.limit + i
      
      // 如果本页 回复 不足 limit 条数 直接中断
      if (index + 1 > docs.length) break

      data.push(docs[index])
    }
  }

  res.send({
    code: 1,
    data
  })
})

module.exports = router
