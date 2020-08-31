const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  foot: String,
  is_reward: Boolean,
  reward_alipay: String,
  reward_wechat: String,
  reward_qq: String,
  about: String,
  email: String,
  email_password: String,
  link_update_check: Number,
  link_apply: String
})
