const auth = require('../tools/auth')

//  验证
module.exports = function (req, res, next) {
  const token = req.query.token || req.body.token|| false

  // 未携带 token 
  if (!token) {
    res.send({
      code: -3,
      data: {}
    })
    return
  }

  // 验证 token
  if (!auth(token)) {
    res.send({
      code: -2,
      data: {},
      msg: 'token过期或错误'
    })
    return
  }

  // 验证成功
  next()
}
