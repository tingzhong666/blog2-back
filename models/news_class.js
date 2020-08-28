const db = require('./db')

module.exports = db.model('NewsClass', require('./schemas/news_class'))
