const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  is_link: Boolean,
  link: String,
  title: String,
  is_content: Boolean,
  Content: String,
})
