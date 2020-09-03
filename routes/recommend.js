const router = require('express').Router(),
  { artical, tag } = require('../models'),
  idCheck = require('../tools/idCheck')

// 相关推荐获取
router.get('/recommend', async (req, res) => {
  const tags = req.query.id ? JSON.parse(req.query.id) : null,
    limit = req.query.limit || 3

  if (tags === null || !tags.length) {
    res.send({
      code: 0,
      msg: 'id参数未传或数组长度为0',
      data: {}
    })
    return
  }

  for (let i = 0; i < tags.length; i++) {
    if (!idCheck(tags[i])) {
      res.send({
        code: 0,
        msg: tags[i] + '此id错误',
        data: {}
      })
      return
    }

    const docs = await tag.find({ _id: tags[i] }).exec()
    if (!docs.length) {
      res.send({
        code: 0,
        msg: tags[i] + '此id不是标签id',
        data: {}
      })
      return
    }
  }

  let data = [], list
  list = tags.map(async v => await artical.find({ tag_id: v }))
  list = await Promise.all(list)
  list = [].concat.apply([], list)

  // 随机截取 limit 个
  let long = list.length
  for (let i = 0; i < limit; i++) {
    // 若是数据库数据不足 就中断
    if (i >= long) break

    let index = Math.floor(Math.random() * list.length)
    data.push(list[index])
    // push 后删除 避免重复 push
    list.splice(index,1)
  }

  // 参数处理
  data = data.map(async v => {
    let vTag = v.tag_id.map(async v => {
      return {
        name: (await tag.findById({ _id: v }).exec()).tag_name,
        id: v
      }
    })
    vTag = await Promise.all(vTag)
    return {
      id: v._id,
      title: v.title,
      time_now: v.time_now,
      readed: v.readed,
      tag: vTag
    }
  })
  data = await Promise.all(data)

  res.send({
    code: 1,
    data
  })
})

module.exports = router
