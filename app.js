const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./config'),
  router = require('./routes'),
  log = require('./tools/log'),
  path = require('path')

app.use(async (req, res, next) => {
  res.setHeader('access-control-allow-origin', config.acrossDoamnOrigin)
  res.setHeader('access-control-allow-headers', '*')
  next()
})
  // 静态图像文件请求
  .use('/temp', express.static(path.join(__dirname, './temp')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.raw())
  .use(router)

app.listen(config.port, () => {
  log.info('run...  port:' + config.port)
})
