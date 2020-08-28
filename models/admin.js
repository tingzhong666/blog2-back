const db = require('./db')

module.exports = db.model('Admin', require('./schemas/admin'))
