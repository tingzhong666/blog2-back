const router = require('express').Router(),
  { artical, tag } = require('../models'),
  idCheck = require('../tools/idCheck')

// 文章列表、文章查询
router.get('/list', async (req, res) => {
  let body = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    tag: req.query.tag || 0,
    q: req.query.q || null,
    time: req.query.time || -1,
    power: req.query.power || 0,
    sort: req.query.sort || 1
  }

  body = {
    limit: body.limit * 1,
    page: body.page * 1,
    tag: body.tag * 1,
    q: body.q,
    time: body.time * 1,
    power: body.power * 1,
    sort: body.sort * 1
  }

  // 查询条件
  let condition, condition1, condition2, condition3

  // 按分类查询
  if (body.q === null) {
    if (body.tag == 0) condition1 = 'true'
    else {
      // 标签id是否正确
      if (!idCheck(body.tag)) {
        res.send({
          code: 0,
          msg: 'id错误',
          data: {}
        })
        return
      }

      let tags = await tag.find({ _id: body.tag }).exec()
      if (!tags.length) {
        res.send({
          code: 0,
          msg: '找不到此id',
          data: {}
        })
        return
      }

      condition1 = `this.tag_id.includes("${body.tag}")`
    }
  } else {
  // 按关键字查询
    condition1 = `/${body.q}/i.test(this.title)`
  }

  // 时间范围
  let d = new Date()
  let d2 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  d = (new Date(d2)).getTime() // 今天 0 点的时间戳
  switch (body.time) {
    case -1: condition2 = 'true'; break
    case -2: condition2 = `this.time_now > ${d}`; break // 今天
    case -3: condition2 = `this.time_now > ${d - 7*24*60*60*1000}`; break // 一周内
    case -4: condition2 = `this.time_now > ${d - 30*24*60*60*1000}`; break // 1月内
    case -5: condition2 = `this.time_now > ${d - 6*30*24*60*60*1000}`; break // 半年内
    case -6: condition2 = `this.time_now > ${d - 12*30*24*60*60*1000}`; break // 1年内
    default: condition2 = `this.time_now >= ${body.time} && this.time_now <= ${body.time + 24*60*60*1000}`; break // 指定日期
  }

  // 阅读权限
  switch (body.power) {
    case 0: condition3 = 'true'; break
    case 1: condition3 = 'this.is_private === false'; break
    case 2: condition3 = 'this.is_private === true'; break
    default: 
      res.send({
        code: 0,
        msg: 'power参数值无效',
        data: {}
      })
      return
  }

  // 条件拼接
  condition = condition1 + '&&' + condition2 + '&&' + condition3

  // 排序
  let sortFunc
  switch (body.sort) {
    case 1: sortFunc = (a, b) => b.time_now - a.time_now; break // 时间降序
    case 2: sortFunc = (a, b) => a.time_now - b.time_now; break // 时间升序
    case 3: sortFunc = (a, b) => b.readed - a.readed; break // 浏览量降序
    case 4: sortFunc = (a, b) => a.readed - b.readed; break // 浏览量升序
    default:
      res.send({
        code: 0,
        msg: 'sort参数值无效',
        data: {}
      })
      return
  }

  // 查询
  const docs = await artical.$where(condition).exec()
  let count = docs.length
  docs.sort(sortFunc)

  // 按 page 页码 limit 条数截取
  let startIndex = (body.page - 1) * body.limit,
    endIndex = body.page * body.limit
  let data = docs.slice(startIndex, endIndex)

  // 参数处理
  data = data.map(async v => {
    let tagV = v.tag_id.map(async t => {
      let name = await tag.find({ _id: t }).exec()
      name = name[0].tag_name
      return {
        id: t,
        name
      }
    })
    tagV = await Promise.all(tagV)

    return {
      id: v._id,
      title: v.title,
      created_time: v.time_now,
      readed: v.readed,
      img: v.img,
      is_reward: v.is_reward,
      is_top: v.is_top,
      is_private: v.is_private,
      tag: tagV
    }
  })
  data = await Promise.all(data)

  res.send({
    code: 1,
    count,
    data
  })
})

module.exports = router
