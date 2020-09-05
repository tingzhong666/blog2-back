const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  content: String,
  class_id: String,
  time_now: {
    type: Number,
    default: Date.now
  },
  is_readed: {
    type: Boolean,
    default: false
  }
})
