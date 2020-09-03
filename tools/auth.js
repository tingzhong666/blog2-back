const jwt = require('jsonwebtoken'),
 { jwtPrivateKey } = require('../config')

//  验证
module.exports = function (token) {
  let isN = true

  // 验证 token 
  try {
    jwt.verify(token, jwtPrivateKey)
  } catch(err) {
    isN = false
  }

  // 验证成功
  return isN
}
