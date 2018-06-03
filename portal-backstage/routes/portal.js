const express = require('express')
const router = express.Router()

const Portal = require('../service/portal')

router.post('/likeIt', async (req, res, next) => {
  const ifAddLike = await Portal.addPraise(req.body.ip)
  ifAddLike 
    ? res.send({status: true, text: '谢谢您对我的肯定，thank you!'}) 
    : res.send({status: false, text: '或许你已经点过赞了~~'})
})

router.get('/getPraiseNum', async (req, res, next) => {
  const num = await Portal.getPramiseNum()
  res.send({num})
})

exports = module.exports = router