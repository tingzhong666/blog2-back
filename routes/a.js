const router = require('express').Router()

router.get('/a', async (req, res) => {
  console.log(212)
  res.send({
    a: '按时发斯蒂芬'
  })
})

module.exports = router
