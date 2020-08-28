const db = require('./db')

module.exports = db.model('Complain', require('./schemas/complain'))
