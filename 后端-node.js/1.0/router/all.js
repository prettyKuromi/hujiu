//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

//导入详情界面处理函数路由模块
const all_handler = require('../router_handler/all')

//获取景点/美食详情界面内容的信息
router.get('/details/:id', all_handler.getDetails)


module.exports = router