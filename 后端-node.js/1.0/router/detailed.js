const express = require('express')
const router = express.Router()
// 导入用户路由处理函数对应的模块
const detailed_handler = require('../router_handler/detailed')

const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { post_content_schema } = require('../schema/detailed')


//获取景点/美食详情信息
// router.get('/getdetailes/:id',detailed_handler.getdetailes)

// //获取对应景点/美食评论详情信息
// router.get('/getcomments/:id',detailed_handler.getcomments)

//写评论
router.post('/postcomment',expressJoi(post_content_schema),detailed_handler.postcomment)
//查看其他用户信息
router.get('/getaccount/:account',detailed_handler.getaccount)


module.exports = router