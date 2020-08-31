const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  user_name: String,
  pass_word: String,
  intro: {
    type: new Schema({
      img: String,
      name: String,
      intro: String,
      github: String
    }),
    default: {
      img: '',
      name: '',
      intro: '',
      github: ''
    }
  }
})