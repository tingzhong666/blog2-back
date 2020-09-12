const router = require('express').Router(),
  check = require('../middlewares/check')

router.get('/auth', check)

module.exports = router