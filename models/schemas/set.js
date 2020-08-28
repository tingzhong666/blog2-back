const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  foot: String,
  is_reward: Boolean,
  reward_alipay: Buffer,
  reward_wechat: Buffer,
  reward_qq: Buffer,
  about: String,
  email: String,
  email_password: String,
  link_time_now: Number,
  link_update_check: Number,
  link_apply: String
})
