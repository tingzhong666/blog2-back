// ObjectId是否正确
module.exports = function (id) {
  if (/[0-9a-fA-F]{24}/.test(id)) return true
  return false
}