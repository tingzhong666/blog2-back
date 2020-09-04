const { model } = require('mongoose')

const router = require('express').Router(),
  { link } = require('../models')

// 友链获取
router.get('/links', async (req, res) => {
  const body = {
    q: req.query.q || null,
    qSelec: req.query.q_selec || 'name',
    display: req.query.display || 0
  }

  let condition, condition1, condition2
  // 查询关键字
  if (body.q === null) condition1 = 'true'
  else {
    switch (body.qSelec) {
      case 'name': condition1 = `/${body.q}/i.test(this.name)`; break // 按友链昵称查询
      case 'url': condition1 = `/${body.q}/i.test(this.link)`; break // 按友链url查询
      default:
        res.send({
          code: 0,
          msg: 'q_selec参数无效',
          data: {}
        })
        return
    }
  }

  // 有效否
  switch (body.display) {
    case 0: condition2 = 'true'; break // 全部
    case -1: condition2 = 'this.is_valid === false'; break // 无效
    case 1: condition2 = 'this.is_valid === true'; break // 有效
    default:
      res.send({
        code: 0,
        msg: 'display参数无效',
        data: {}
      })
      return
  }

  condition = condition1 + '&&' + condition2

  const docs = await link.$where(condition).exec()
  let data = docs.map(async v => {
    return {
      id: v._id,
      name: v.name,
      url: v.link,
      is_valid: v.is_valid
    }
  })
  data = await Promise.all(data)

  res.send({
    code: 1,
    data
  })
})

module.exports = router
