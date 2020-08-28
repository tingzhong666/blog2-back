const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  content: String,
  class_id: String,
  time_now: Number,
  is_readed: Boolean
})
