const mongoose = require('mongoose'),
  { mongodb: {user, pass, host, port, dataBase} } = require('../config'),
  log = require('../tools/log')


mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${dataBase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', () => {
  log.error('数据库连接错误')
})

mongoose.connection.on('open', () => {
  log.info('数据库连接成功')
  log.info(`mongodb://${user}:${pass}@${host}:${port}/${dataBase}`)
})


module.exports = mongoose
