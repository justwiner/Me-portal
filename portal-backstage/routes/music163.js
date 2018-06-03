const express = require('express')
const router = express.Router()
const music163 = require('../service/music163')

router.post('/playlist',async (req, res, next) => {
  const data = await music163.filterPlayList(req.body.id)
  res.send(data)
})

exports = module.exports = router