const router = require('express').Router(),
  { tag } = require('../models')

// 标签获取
router.get('/tag', async (req, res) => {
  const name = req.query.name || null
  let docs
  if (name) {
    docs = await tag.$where(`/${name}/.test(this.tag_name)`).exec()
  } else {
    docs = await tag.find().exec()
  }
  const data = docs.map(v => {
    return {
      name: v.tag_name,
      id: v._id
    }
  })

  res.send({
    code: 1,
    data
  })
})

module.exports = router
