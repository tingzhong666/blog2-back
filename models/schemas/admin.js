const db = require('../db'),
  Schema = db.Schema

module.exports = new Schema({
  user_name: String,
  pass_word: String,
  intro: {
    type: new Schema({
      img: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: 'admin'
      },
      intro: {
        type: String,
        default: null
      },
      github: {
        type: String,
        default: null
      }
    }),
    default: {
      img: null,
      name: 'admin',
      intro: null,
      github: null
    }
  }
})