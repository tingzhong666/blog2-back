const router = require('express').Router(),
  { admin } = require('../models')

// 博主信息获取
router.get('/intro', async (req, res) => {
  let docs = await admin.find().exec()
  res.send({
    code: 1,
    data: {
      img: docs[0].intro.img,
      name: docs[0].intro.name,
      intro: docs[0].intro.intro,
      github: docs[0].intro.github
    }
  })
})

module.exports = router
