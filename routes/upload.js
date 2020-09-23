const router = require('express').Router(),
  multer = require('multer'),
  { upPath } = require('../config'),
  check = require('../middlewares/check'),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, upPath)
    },
    filename: function (req, file, cb) {
      let name = file.originalname
      suffix = /\.[a-zA-Z0-9]{1,5}$/.exec(name)
      name = '' + (10**18*Math.random())  + suffix
      
      cb(null, name)
    }
  }),
  upload = multer({ storage })

// 文件上传
router.post('/upload', check, upload.array('files'), async (req, res) => {
  if (req.files === undefined || !req.files.length) {
    res.send({
      code: 0,
      msg: '没有文件接收',
      data: {}
    })
    return
  }

  res.send({
    code: 1,
    data: {
      url: req.files[0].path
    }
  })
})

module.exports = router
