const { news, news_class: newsClass } = require('../models')

/**
 * 消息新增
 * @param {Number} n 消息类别 1 文章评论 2 友链申请 3 吐槽评论 4 留言新增
 * @param {String} content 内容
 * @param {String} title 标题
 * @param {String} id 消息源id
 */
module.exports = async function ({ n, content, title = null,  originalId = null}) {
  // 分类id获取
  let classId
  switch (n) {
    case 1: classId = (await newsClass.find({ name: '文章评论' }))[0].id; break
    case 2: classId = (await newsClass.find({ name: '友链申请' }))[0].id; break
    case 3: classId = (await newsClass.find({ name: '吐槽评论' }))[0].id; break
    case 4: classId = (await newsClass.find({ name: '留言' }))[0].id; break
    default: return
  }

  // 消息新增
  const doc = new news({
    content,
    class_id: classId,
    title,
    original_id: originalId
  })
  doc.save()
}