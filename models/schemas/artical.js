const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  title: String,
  img: Buffer,
  tag_id: String,
  intro: String,
  readed: Number,
  time_now: Number,
  modify_time_now: Number,
  content: String,
  is_reward: Boolean,
  is_private: Boolean,
  is_top: Boolean,
  comment: [require('./comment')]
})