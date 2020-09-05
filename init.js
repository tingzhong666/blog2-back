const { init } = require('./config'),
  { admin, set, news_class: newsClass } = require('./models'),
  md5 = require('md5'),
  db = require('./models/db'),
  log = require('./tools/log')
// 重置 或 初始化时 使用

const main = async function () {
  // 清除
  await admin.find().deleteMany().exec()
  await set.find().deleteMany().exec()

  let doc
  // 创建管理员
  doc = new admin({
    user_name: init.username,
    pass_word: md5(init.password)
  })
  await doc.save()
  log.info('admin init completed!')

  // 创建基本信息
  doc = new set({})
  await doc.save()
  log.info('set init completed!')

  // 消息分类创建
  doc = new newsClass({ name: '文章评论' })
  await doc.save()
  doc = new newsClass({ name: '友链申请' })
  await doc.save()
  doc = new newsClass({ name: '吐槽评论' })
  await doc.save()
  doc = new newsClass({ name: '留言' })
  await doc.save()
  log.info('newsClass init completed!')
  
  db.connection.close()
}

main()
