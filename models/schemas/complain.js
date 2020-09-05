const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  content: String,
  time_now: {
    type: Number,
    default: Date.now
  },
  count: {
    type: Number,
    default: 0
  },
  comment: [require('./comment_one')]
})
