const db = require('../db'),
  Schema = db.Schema

// 一维评论
module.exports = new Schema({
  name: String,
  contact: String,
  email: String,
  content: String,
  time_now: Number,
  reply_id: String
})
