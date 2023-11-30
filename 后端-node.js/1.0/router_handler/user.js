// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.register = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  const sqlStr = 'select * from user where account=?'
  db.query(sqlStr, userinfo.account, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义插入新用户的 SQL 语句
    const sql = 'insert into user set ?'
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, { account: userinfo.account, password: userinfo.password ,nickname:userinfo.account, avatar:'https://s1.4sai.com/src/img/png/0d/0d2fe3e7208b447296eef82b904dfc53.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/&e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:NnqXwD6XMww-C5ErIgwUOqiPB1I=',credit:70,birthday:"2003-11-11"}, (err, results) => {
      if (err) return res.cc(err)
      // 判断影响行数是否为 1
      // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      // res.send({ status: 0, message: '注册成功！' })
      //在服务器端生成 jwt 的字符串
      
    //   const user = { ...results[0], password: '' }
    //   // 对用户的信息进行加密，生成 Token 字符串
    //   const jwtStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    //   res.send({
    //     code:'0',
    //     msg:'注册成功',
    //     account:userinfo.account,
    //     credit:70,
    //     jwt:'Bearer ' + jwtStr
    //   })
      res.cc('注册成功！', '0')
      
    })
  })
}

exports.login = (req, res) => {
  // 接收表单的数据
  const userinfo = req.body
  // 定义 SQL 语句
  const sql = `select *  from user where account = ?`
  // 执行 SQL 语句，根据用户名查询用户的信息
  db.query(sql, userinfo.account, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！')

    // TODO：判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败！')

    // TODO：在服务器端生成 Token 的字符串
    const user = { ...results[0], password: '' }
    console.log(user)
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      code: '0',
      msg: '登录成功！',
      jwt:  'Bearer ' + tokenStr,
    })
  })
}



exports.donate = (req, res) => {
  res.send({
    QRcodepic: "http://dummyimage.com/400x400",
    code: "0",
    msg: "成功"
  })
}