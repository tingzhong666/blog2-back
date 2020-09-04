const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  foot: {
    type: String,
    default: ''
  },
  is_reward: {
    type: Boolean,
    default: true
  },
  reward_alipay: {
    type: String,
    default: ''
  },
  reward_wechat: {
    type: String,
    default: ''
  },
  reward_qq: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  email_password: {
    type: String,
    default: ''
  },
  link_update_check: {
    type: Number,
    default: Date.now
  },
  link_apply: {
    type: String,
    default: ''
  },
  link_check_time: {
    type: Number,
    default: 24*60*60*1000 // 默认每天
  }
})
