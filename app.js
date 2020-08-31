const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./config'),
  router = require('./routes'),
  log = require('./tools/log')

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.raw())
  .use(router)

app.listen(config.port, () => {
  log.info('run...  port:' + config.port)
})
