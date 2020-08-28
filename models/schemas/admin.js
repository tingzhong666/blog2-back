const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  user_name: String,
  pass_word: String,
  intro: new Schema({
    img: Buffer,
    name: String,
    intro: String,
    github: String
  })
})