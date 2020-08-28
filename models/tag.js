const db = require('./db')

module.exports = db.model('Tag', require('./schemas/tag'))
