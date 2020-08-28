const mongoose = require('mongoose'),
  { mongodb: {user, pass, host, port, dataBase} } = require('../config')


mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/${dataBase}`, {
  useNewUrlParser: true
})

mongoose.connection.on('error', () => {
  console.error(' 数据库连接错误')
})

mongoose.connection.on('open', () => {
  console.log('数据库连接成功')
  console.log(`mongodb://${user}:${pass}@${host}:${port}/${dataBase}`)
})


module.exports = mongoose
