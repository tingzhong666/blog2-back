const db = require('./db')

module.exports = db.model('Artical', require('./schemas/artical'))
