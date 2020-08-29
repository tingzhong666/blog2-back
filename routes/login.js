const router = require('express').Router(),
 { admin } = require('../models'),
 jwt = require('jsonwebtoken'),
 { jwtPrivateKey } = require('../config'),
 md5 = require('md5')

//  登录
router.post('/login', async (req, res) => {
  const username = req.body.username || false,
    password = req.body.password || false,
    time = req.body.time || 604800000 // 默认 7 天
  
  // 用户名或密码为空
  if (!username | !password) {
    res.send({
      code: -1,
      data: {}
    })
    return
  }

  let data = {}

  const result = await admin.find({ user_name: username, pass_word: md5(password) })
  // 正确
  if (result.length) {
    // expiresIn 传入字符串 且不加单位 默认为 ms
    token = jwt.sign({ username, password, isLogin: true }, jwtPrivateKey, { expiresIn: time + '' })
    data = {
      code: 1,
      data: {
        token
      }
    }
  // 用户名或密码错误
  }else{
    data = {
      code: 0,
      data: {}
    }
  }
  
  res.send(data)
})

module.exports = router
