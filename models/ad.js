const db = require('./db')

module.exports = db.model('Ad', require('./schemas/ad'))
