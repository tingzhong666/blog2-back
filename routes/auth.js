const router = require('express').Router(),
  check = require('../middlewares/check')

router.post('/auth', check, async (req, res) => {
  res.send({
    code: 1,
    data: {}
  })
})

module.exports = router