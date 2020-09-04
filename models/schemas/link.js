const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  name: String,
  link: String,
  is_valid: Boolean
})
