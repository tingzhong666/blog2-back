const fs = require('fs')

const dir = fs.readdirSync(__dirname, {
  withFileTypes: true
})

dir.forEach(v => {
  if (v.name == 'idnex.js' || v.name == 'db.js' || v.isDirectory()) return
  v = v.name.replace(/\.js$/, '')
  exports[v] = require('./' + v)
})
