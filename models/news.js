const db = require('./db')

module.exports = db.model('News', require('./schemas/news'))
