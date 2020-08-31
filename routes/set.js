const router = require('express').Router(),
  { set } = require('../models')

// 基本设置获取
router.get('/set', async (req, res) => {
  let docs = await set.find().exec()
  res.send({
    code: 1,
    data: {
      foot: docs[0].foot,
      is_reward: docs[0].is_reward,
      reward: {
        alipay: docs[0].reward_alipay,
        wx: docs[0].reward_wechat,
        qq: docs[0].reward_qq
      },
      email: docs[0].email
    }
  })
})

module.exports = router
