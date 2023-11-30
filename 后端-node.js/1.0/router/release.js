const express = require('express')

const router = express.Router()



// 导入用户路由处理函数对应的模块
const release_handler = require('../router_handler/release')
// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { release_schema } = require('../schema/release')
//发布
router.post('/', expressJoi(release_schema),release_handler.release)

module.exports = router