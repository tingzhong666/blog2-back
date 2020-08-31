const router = require('express').Router(),
  { set } = require('../models'),
  check = require('../middlewares/check')

// 基本设置修改
router.post('/set', check, async (req, res) => {
  const reward = req.body.reward || {},
    body = {
      foot: req.body.foot || null,
      is_reward: req.body.is_reward || null,
      email: req.body.email || null,
      email_password: req.body.email_password || null,
      reward_alipay: reward.alipay || null,
      reward_wechat: reward.wx || null,
      reward_qq: reward.qq || null
    }
  
  let docs = await set.find().exec()
  for(let k in body) {
    // 参数未传就跳过本次循环
    if(body[k] === null) continue

    docs[0][k] = body[k]
  }
  docs[0].save()

  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router
