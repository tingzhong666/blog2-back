const router = require('express').Router(),
  { link_apply: linkApply } = require('../models')

// 友链申请获取
router.get('/link_applys', async (req, res) => {
  const body = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    }

  const docs = await linkApply.find().exec()

  let data
  // 排序 时间倒序
  docs.sort((a, b) => b.time_now - a.time_now)

  // -1 时 返回全部
  if (body.limit == -1) data = docs
  else {
    // 截取部分
    let startIndex = (body.page - 1) * body.limit,
    endIndex = body.page * body.limit
    data = docs.slice(startIndex, endIndex).map(async v => {
      let reply = v.reply.map(async r => {
        let reply_name = await v.reply.id(r.reply_id)
        if (reply_name !== null) reply_name = reply_name.name
        return {
          id: r._id,
          name: r.name,
          contact: r.contact,
          email: r.email,
          content: r.content,
          created_time: r.time_now,
          reply_id: r.reply_id,
          reply_name,
          level: r.level
        }
      })
      reply = await Promise.all(reply)

      return {
        id: v._id,
        name: v.name,
        contact: v.contact,
        email: v.email,
        content: v.content,
        created_time: v.time_now,
        level: v.level,
        reply
      }
    })

    data = await Promise.all(data)
  }

  res.send({
    code: 1,
    data
  })
})

module.exports = router
