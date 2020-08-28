const db = require('./db')

module.exports = db.model('Set', require('./schemas/set'))
