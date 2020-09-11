const path = require('path')

module.exports = {
  // 跨域源配置 * 表示所有 -- 格式为 http:域名:端口 -- or -- https:域名 -- 允许使用正则
  acrossDoamnOrigin: '*',
  // mongodb 配置
  mongodb: {
    // 数据库地址
    host: '127.0.0.1',
    // 数据库端口
    port: 27017,
    // 数据库用户账户
    user: 'blog',
    // 数据库用户密码
    pass: 'admin',
    // 数据库名称
    dataBase: 'blog'
  },
  // 监听端口
  port: 80,
  // jwt token 登录状态签名私钥 随便改个随机字符就行
  jwtPrivateKey: 'asfsdzvsdfsgwergwe',
  // 初始设置
  init: {
    username: 'admin',
    password: 'admin'
  },
  // 日志路径
  logPath: path.join(__dirname, 'logs'),
  // 日志保存天数
  logStay: 30,
  // 文件上传保存路径
  upPath: path.join(__dirname, 'temp')
}
