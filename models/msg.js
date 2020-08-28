const db = require('./db')

module.exports = db.model('Msg', require('./schemas/comment'))
