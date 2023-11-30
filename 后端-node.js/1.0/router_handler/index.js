//导入数据库操作模块
const { Http2ServerRequest } = require('http2')
const db = require('../db/index')
//导入处理路径的核心模块
const path = require('path')

//定义切换到景点的函数
exports.getChangeScene = (req, res) => {
  //获得当前页数
  const page = req.query.page
  //获得用户名
  const account = req.user.account
  //定义每页显示的条数
  const pageSize = 6
  //定义查询总条数的语句
  const sqlCount = "SELECT COUNT(*) AS total FROM `all` WHERE sid = '0'"
  //调用db.query()执行sql语句
  db.query(sqlCount, (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数

      const start = (page - 1) * pageSize; // 计算起始位置
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      //定义查询所有的景点数据的sql语句
      const sql = "select all.id,all.name,all.rank,all.address,all.opening_hours,all.picture,all.Longitude,all.Latitude,count(co.id) as commentnum from `all` left join comment co on all.id=co.id and co.sid='0' where all.sid ='0' group by all.id limit ?, ?"
      //调用db.query()执行sql语句
      db.query(sql, [start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err)
        }
        //执行sql语句成功
        else {
          //定义datas内容
          const attractions = results.map((row) => ({
            id: row.id,
            name: row.name,
            address: row.address,
            opening_hours: row.opening_hours,
            picture: row.picture,
            rank: row.rank,
            Longitude: row.Longitude,
            Latitude: row.Latitude,
          }));
          // 循环查询是否已收藏
          const promises = attractions.map((attraction) => {
            return new Promise((resolve, reject) => {
              db.query(sqlLike, [attraction.id, account], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  const isLike = results.length > 0 ? '已收藏' : '未收藏';
                  attraction.isLike = isLike;
                  resolve();
                }
              });
            });
          });
          Promise.all(promises)
            .then(() => {
              // 所有查询是否已收藏的操作都完成后，继续处理其他逻辑
              // 定义data内容
              const data = {
                counts: total,
                pageSize: pageSize,
                totalPages: totalPages,
                page: page
              };
              // 定义返回内容
              const back = {
                code: '0',
                msg: '成功',
                data: data,
                datas: attractions
              };
              if (page === totalPages && total % pageSize !== 0) {
                back.datas = back.datas.slice(0, total % pageSize);
              }
              res.send(back);
            })
            .catch((err) => {
              // 错误处理
              res.cc(err);
            });
        }
      })
    }
  })
}


//定义切换到美食的函数
exports.getChangeFood = (req, res) => {
  //获得当前页数
  const page = req.query.page
  //获得用户名
  const account = req.user.account
  //定义每页显示的条数
  const pageSize = 6
  //定义查询总条数的语句
  const sqlCount = "SELECT COUNT(*) AS total FROM `all` WHERE sid = '0'"
  //调用db.query()执行sql语句
  db.query(sqlCount, (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数

      const start = (page - 1) * pageSize; // 计算起始位置
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      //定义查询所有的景点数据的sql语句
      const sql = "select all.id,all.name,all.rank,all.address,all.opening_hours,all.picture,all.Longitude,all.Latitude,count(co.id) as commentnum from `all` left join comment co on all.id=co.id and co.sid='1' where all.sid ='1' group by all.id limit ?, ?"
      //调用db.query()执行sql语句
      db.query(sql, [start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err)
        }
        //执行sql语句成功
        else {
          //定义datas内容
          const attractions = results.map((row) => ({
            id: row.id,
            name: row.name,
            address: row.address,
            opening_hours: row.opening_hours,
            picture: row.picture,
            rank: row.rank,
            Longitude: row.Longitude,
            Latitude: row.Latitude,
          }));
          // 循环查询是否已收藏
          const promises = attractions.map((attraction) => {
            return new Promise((resolve, reject) => {
              db.query(sqlLike, [attraction.id, account], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  const isLike = results.length > 0 ? '已收藏' : '未收藏';
                  attraction.isLike = isLike;
                  resolve();
                }
              });
            });
          });
          Promise.all(promises)
            .then(() => {
              // 所有查询是否已收藏的操作都完成后，继续处理其他逻辑
              // 定义data内容
              const data = {
                counts: total,
                pageSize: pageSize,
                totalPages: totalPages,
                page: page
              };
              // 定义返回内容
              const back = {
                code: '0',
                msg: '成功',
                data: data,
                datas: attractions
              };
              if (page === totalPages && total % pageSize !== 0) {
                back.datas = back.datas.slice(0, total % pageSize);
              }
              res.send(back);
            })
            .catch((err) => {
              // 错误处理
              res.cc(err);
            });
        }
      })
    }
  })
}


//定义搜索景点的函数
exports.getSearchScene = (req, res) => {
  // 获得当前页数
  const page = req.query.page;
  // 获得用户名
  const account = req.user.account;
  // 定义每页显示的条数
  const pageSize = 6;
  // 从页面获取关键词
  const keyword = req.query.keyword;
  if (!keyword) {
    //关键词为空
    return res.send({
      code: '-1',
      msg: '请输入关键词'
    });
  }
  // 拼接关键词
  const searchKeyword = '%' + keyword + '%';
  // 定义查询总条数的语句
  const sqlCount = 'SELECT COUNT(*) AS total FROM `all` WHERE sid = "0"and (intro LIKE ? or name like ?)';
  db.query(sqlCount, [searchKeyword, searchKeyword], (err, results) => {
    if (err) {
      // SQL 查询错误
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数
      if (page > totalPages) {
        // 当前页数超过总页数
        return res.send({
          code: '-1',
          msg: '页数超出范围'
        });
      }
      const start = (page - 1) * pageSize; // 计算起始位置
      // 定义是否已收藏的 SQL 语句
      const sqlLike = 'SELECT * FROM `collection` WHERE id=? AND account=?';
      // 定义查询匹配景点的 SQL 语句（注意逗号）
      const sql = 'SELECT id,name,address,opening_hours,picture,rank,Longitude,Latitude FROM `all` WHERE sid="0" AND (intro LIKE ? OR name LIKE ?) LIMIT ?, ?';
      // 调用 db.query() 执行 SQL 语句
      db.query(sql, [searchKeyword, searchKeyword, start, pageSize], (err, results) => {
        if (err) {
          return res.cc(err);
        } else {
          const attractions = results.map((row) => ({
            id: row.id,
            name: row.name,
            address: row.address,
            opening_hours: row.opening_hours,
            picture: row.picture,
            rank: row.rank,
            Longitude: row.Longitude,
            Latitude: row.Latitude
          }));
          // 循环查询是否已收藏
          const promises = attractions.map((attraction) => {
            return new Promise((resolve, reject) => {
              db.query(sqlLike, [attraction.id, account], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  const isLike = results.length > 0 ? '已收藏' : '未收藏';
                  attraction.isLike = isLike;
                  resolve();
                }
              });
            });
          });
          Promise.all(promises)
            .then(() => {
              // 所有查询是否已收藏的操作都完成后，继续处理其他逻辑
              // 定义 data 内容
              const data = {
                counts: total,
                pageSize: pageSize,
                totalPages: totalPages,
                page: page
              };
              // 定义返回内容
              const back = {
                code: '0',
                msg: '成功',
                data: data,
                datas: attractions
              };
              if (page === totalPages && total % pageSize !== 0) {
                back.datas = back.datas.slice(0, total % pageSize);
              }
              res.send(back);
            })
            .catch((err) => {
              // 错误处理
              res.cc(err);
            });
        }
      });
    }
  });
}

//定义搜索美食的函数
exports.getSearchFood = (req, res) => {
  // 获得当前页数
  const page = req.query.page;
  // 获得用户名
  const account = req.user.account;
  // 定义每页显示的条数
  const pageSize = 6;
  // 从页面获取关键词
  const keyword = req.query.keyword;
  // 拼接关键词
  const searchKeyword = '%' + keyword + '%';
  // 定义查询总条数的语句
  const sqlCount = 'SELECT COUNT(*) AS total FROM `all` WHERE sid = "1" and (intro LIKE ? or name like ?)';
  db.query(sqlCount, [searchKeyword, searchKeyword], (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数

      const start = (page - 1) * pageSize; // 计算起始位置
      // 定义是否已收藏的 SQL 语句
      const sqlLike = 'SELECT * FROM `collection` WHERE id=? AND account=?';
      // 定义查询匹配景点的 SQL 语句
      const sql = 'SELECT id,name,address,opening_hours,picture,rank,Longitude,Latitude FROM `all` WHERE sid="1" and (intro LIKE ? or name like ?) limit ?, ?';
      // 调用 db.query() 执行 SQL 语句
      db.query(sql, [searchKeyword, searchKeyword, start, pageSize], (err, results) => {
        if (err) {
          return res.cc(err);
        } else {
          const attractions = results.map((row) => ({
            id:row.id,
            name: row.name,
            address: row.address,
            opening_hours: row.opening_hours,
            picture: row.picture,
            rank: row.rank,
            Longitude: row.Longitude,
            Latitude: row.Latitude
          }));
          // 循环查询是否已收藏
          const promises = attractions.map((attraction) => {
            return new Promise((resolve, reject) => {
              db.query(sqlLike, [attraction.id, account], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  const isLike = results.length > 0 ? '已收藏' : '未收藏';
                  attraction.isLike = isLike;
                  resolve();
                }
              });
            });
          });
          Promise.all(promises)
            .then(() => {
              // 所有查询是否已收藏的操作都完成后，继续处理其他逻辑
              // 定义 data 内容
              const data = {
                counts: total,
                pageSize: pageSize,
                totalPages: totalPages,
                page: page
              };
              // 定义返回内容
              const back = {
                code: '0',
                msg: '成功',
                data: data,
                datas: attractions
              };
              if (page === totalPages && total % pageSize !== 0) {
                back.datas = back.datas.slice(0, total % pageSize);
              }
              res.send(back);
            })
            .catch((err) => {
              // 错误处理
              res.cc(err);
            });
        }
      });
    }
  });
};
