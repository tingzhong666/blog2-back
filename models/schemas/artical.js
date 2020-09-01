const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  title: String,
  img: String,
  tag_id: [String],
  intro: String,
  readed: {
    type: Number,
    default: 0
  },
  time_now: {
    type: Number,
    default: Date.now
  },
  modify_time_now: {
    type: Number,
    default: Date.now
  },
  content: String,
  is_reward: Boolean,
  is_private: Boolean,
  is_top: Boolean,
  comment: [require('./comment')]
})