//导入数据库操作模块
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')
//导入处理路径的核心模块
const path = require('path')

//定义查询景点/美食的详细信息的函数
exports.getDetails = (req, res) => {

  //从点击中获取关键词
  //const name = req.params.name; // 获取传入的name参数
  //获取景点id
  const id = req.params.id
  //获得用户名
  const account = req.user.account
  //获得当前页数
  const page = parseInt(req.query.page, 10)
  //定义每页显示的条数
  const pageSize = 6
  const start = (page - 1) * pageSize; // 计算起始位置
  //定义查询总条数的语句
  const sqlCount = "SELECT COUNT(*) AS total FROM `comment` LEFT JOIN `all` ON all.id = comment.id WHERE all.id =?"
  //调用db.query()执行sql语句
  db.query(sqlCount, [id], (err, results) => {
    if (err) {
      console.error(err)
      return res.cc(err);
    } else {
      const total = results[0].total; // 获取总记录数
      const totalPages = Math.ceil(total / pageSize); // 计算总页数
      //定义查询是否收藏的sql语句
      const sqlLike = "select * from collection where id=? AND account=?"
      db.query(sqlLike, [id, account], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err)
        }
        // 判断该内容是否已被收藏
        const isLike = results.length > 0 ? '已收藏' : '未收藏'
        //定义查询主题景点或美食的sql语句
        const sqlMain = "select all.name,all.address,all.opening_hours,all.picture,all.rank,all.Longitude,all.Latitude from `all` where all.id=?"
        //执行语句
        db.query(sqlMain, [id], (err, results) => {
          if (err) {
            return res.cc(err)
          }
          //执行成功
          else {
            const Main = results[0]
            //定义查询所有景点/美食的sql语句
            const sql = 'select comment.content,comment.account,comment.nickname,comment.rating,comment.picture1,comment.picture2,comment.picture3,user.avatar from `comment` LEFT JOIN `all` ON all.id = comment.id LEFT JOIN `user` ON user.userid = comment.userid where all.id = ?'
            db.query(sql, [id], (err, results) => {
              if (err) {
                return res.cc(err)
              }
              //执行sql语句成功
              else {
                //定义datas内容
                const attractions = results.map((row) => ({
                  content: row.content,
                  account: row.account,
                  nickname: row.nickname,
                  rating: row.rating,
                  picture1: row.picture1,
                  picture2: row.picture2,
                  picture3: row.picture3,
                  avatar:row.avatar
                }));
                //定义data内容
                const data = {
                  counts: total,
                  pageSize: pageSize,
                  totalPages: totalPages,
                  page: page,
                  isLike: isLike,
                }
                const datas = {
                  Main: Main,
                  comment: attractions
                }
                //定义返回内容
                const back = {
                  code: '0',
                  msg: '成功',
                  data: data,
                  datas: datas,
                }
                // 如果当前页为最后一页，并且剩余数据不足6条，则返回剩余的数据
                //if (page === totalPages && total % pageSize !== 0) {
                  //back.datas.comment = back.datas.comment.slice(0, total % pageSize);
                //}
                res.send(back)
              }
            })
          }
        })

      })
    }
  })
}