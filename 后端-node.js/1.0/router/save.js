//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

//导入切换页面的路由处理函数模块
const save_handler = require('../router_handler/save')

//获取收藏界面中景点的基础信息
router.get('/scene', save_handler.getChangeScene)

//获取收藏界面中美食的基础信息
router.get('/food', save_handler.getChangeFood)

//在收藏界面中搜索景点
router.get('/scene/search', save_handler.getSearchScene)

//在收藏界面中搜索美食
router.get('/food/search', save_handler.getSearchFood)

//对美食/景点进行收藏
router.post('/save_delete',save_handler.postSave_Delete)


module.exports = router