// 导入 express
const express = require('express')
// 创建服务器的实例对象
const app = express()

const joi = require('joi')

// const multer = require('multer');  


app.use(express.json());
// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, code = '1') {
    res.send({
      code,
      msg: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/user/] }))

//定义multer中间件
// const upload = multer({ dest: 'uploads/' });   
// app.use(bodyParser.json());  


// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/changeinfo', userinfoRouter)
// 导入并使用发布的路由模块
const releaseRouter = require('./router/release')
app.use('/release', releaseRouter)
//导入并使用收藏路由模块
const saveRouter = require('./router/save')
app.use('/save', saveRouter)
//导入并使用首页的路由模块
const indexRouter = require('./router/index')
app.use('/index', indexRouter)
//导入查看详细情况的路由模块
const allRouter = require('./router/all')
app.use('/all', allRouter)

const detailedRouter = require('./router/detailed')
app.use('/detailed', detailedRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

// 启动服务器
app.listen(3100, () => {
  console.log('api server running at https://116.62.131.212:3100')
})
