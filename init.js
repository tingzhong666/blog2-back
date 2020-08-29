const { init } = require('./config'),
  { admin } = require('./models'),
  md5 = require('md5'),
  db = require('./models/db')

const doc = new admin({
  user_name: init.username,
  pass_word: md5(init.password)
})

doc.save().then(res => {
  console.log('Init complete!')
  db.connection.close()
}).catch(console.error.bind(console))