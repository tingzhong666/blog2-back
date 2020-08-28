const router = require('express').Router(),
  fs = require('fs')

const dir = fs.readdirSync(__dirname, { withFileTypes: true })
  
dir.forEach(v => {
  if(v.name == 'index.js' || v.isDirectory()) return
    
  v = v.name.replace(/\.js$/, '')
  router.use(require('./' + v))
})

module.exports = router
