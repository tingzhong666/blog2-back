const jwt = require('jsonwebtoken'),
 { jwtPrivateKey } = require('../config')

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
  try {
    jwt.verify(token, jwtPrivateKey)
  } catch(err) {
    res.send({
      code: -2,
      data: {},
      err
    })
    return
  }

  // 验证成功
  next()
}
