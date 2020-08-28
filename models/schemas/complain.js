const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  content: String,
  comment: [require('./comment_one')]
})
