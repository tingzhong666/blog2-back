const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./config'),
  router = require('./routes')

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.raw())
  .use(router)

app.listen(config.port, () => {
  console.log('run...  port:' + config.port)
})
