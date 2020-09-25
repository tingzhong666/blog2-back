const router = require('express').Router(),
  { artical, tag } = require('../models'),
  idCheck = require("../tools/idCheck")

// 文章详情
router.get('/artical_details', async (req, res) => {
  const id = req.query.id || null

  if (id === null) {
    res.send({
      code: 0,
      msg: 'id参数未传或为空',
      data: {}
    })
    return
  }

  if (!idCheck(id)) {
    res.send({
      code: 0,
      msg: 'id错误',
      data: {}
    })
    return
  }

  const docs = await artical.find({ _id: id }).exec()
  if (!docs.length) {
    res.send({
      code: 0,
      msg: 'id找不到',
      data: {}
    })
    return
  }

  const tags = docs[0].tag_id.map(async v => {
    let docs = await tag.find({ _id: v }).exec()
    return {
      id: v,
      name: docs[0].tag_name
    }
  })

  res.send({
    code: 1,
    data: {
      id: docs[0]._id,
      title: docs[0].title,
      intro: docs[0].intro,
      content: docs[0].content,
      created_time: docs[0].time_now,
      img: docs[0].img,
      tag: tags,
      readed: docs[0].readed,
      modify_time: docs[0].modify_time_now,
      is_reward: docs[0].is_reward,
      is_private: docs[0].is_private,
      is_top: docs[0].is_top
    }
  })
})

module.exports = router
