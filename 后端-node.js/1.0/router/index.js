//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

//导入切换界面处理函数路由模块
const index_handler = require('../router_handler/index')

//获取首页中景点的基础信息
router.get('/scene', index_handler.getChangeScene)

//获取首页中美食的基础信息
router.get('/food', index_handler.getChangeFood)

//首页中搜索景点(用简介和名字匹配)
router.get('/scene/search', index_handler.getSearchScene)

//首页中搜索美食(用简介和名字匹配)
router.get('/food/search', index_handler.getSearchFood)
module.exports = router