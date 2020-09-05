const router = require('express').Router(),
  { complain } = require('../models')

// 吐槽获取
router.get('/complain', async (req, res) => {
  const body = {
    page: req.query.page || 1,
    limit: req.query.limit || 10
  }

  // 查询
  let docs = await complain.find().exec()
  let startIndex = (body.page - 1) * body.limit,
    endIndex = body.page * body.limit

  // 排序 截取
  docs.sort((a, b) => b.time_now - a.time_now)
  let data = docs.slice(startIndex, endIndex).map(async v => {
    return {
      id: v._id,
      content: v.content,
      created_time: v.time_now,
      count: v.count
    }
  })
  data = await Promise.all(data)

  res.send({
    code: 1,
    data
  })
})

module.exports = router
