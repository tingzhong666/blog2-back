const router = require('express').Router(),
  check = require('../middlewares/check')

router.post('/auth', check)

module.exports = router