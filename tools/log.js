const log4js = require('log4js'),
  { logPath, logStay } = require('../config'),
  path = require('path')
log4js.configure({
 appenders: {
  out: { type: 'stdout' },
  logs: { type: 'file', filename: path.join(logPath, 'webapp.log'), daysToKeep: logStay }
 },
 categories: {
  default: { appenders: ['out'], level: 'debug' },
  // 线上使用
  logs: { appenders: ['logs'], level: 'error' }
 }
})

// 开发
const log = log4js.getLogger()
log.level = 'debug'

// // 线上
// const log = log4js.getLogger('logs')
// log.level = 'error'

module.exports = log
