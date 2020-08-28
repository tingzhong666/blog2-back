const db = require('./db')

module.exports = db.model('Link', require('./schemas/link'))
