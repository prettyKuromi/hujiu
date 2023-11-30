
//导入数据库操作模块
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
  const sqlCount = "SELECT COUNT(*) AS total FROM `collection` LEFT JOIN `all` ON all.id = collection.id WHERE all.sid = '0' and account =?"
  //调用db.query()执行sql语句
  db.query(sqlCount, [account], (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数

      const start = (page - 1) * pageSize; // 计算起始位置
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      // 定义查询用户收藏的景点数据的SQL语句
      const sql = "SELECT all.id, all.name, all.rank, all.address, all.opening_hours, all.picture, all.Longitude, all.Latitude, co.commentnum FROM `all` LEFT JOIN (SELECT id, COUNT(id) AS commentnum FROM comment GROUP BY id) AS co ON all.id = co.id WHERE all.sid = '0' AND EXISTS (SELECT 1 FROM collection WHERE collection.id = all.id AND collection.account = ?) LIMIT ?, ?;"

      //调用db.query()执行sql语句
      db.query(sql, [account, start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err);
        }
        //执行sql语句成功
        else {
          // 查询结果为空
          if (!results || results.length === 0 || results[0].id == null) {
            const data = {
              counts: 0,
              pageSize: pageSize,
              totalPages: 0,
              page: page
            };
            const back = {
              code: '1',
              msg: '没有收藏',
              data: data,
              datas: []  // 返回一个空数组表示没有数据
            };
            res.send(back);
          } else {
            // 定义datas内容
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
  const sqlCount = "SELECT COUNT(*) AS total FROM `collection` LEFT JOIN `all` ON all.id = collection.id WHERE all.sid = '1' and account =?"
  //调用db.query()执行sql语句
  db.query(sqlCount, [account], (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数

      const start = (page - 1) * pageSize; // 计算起始位置
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      //定义查询用户收藏的景点数据的sql语句
      const sql = "SELECT all.id, all.name, all.rank, all.address, all.opening_hours, all.picture, all.Longitude, all.Latitude, co.commentnum FROM `all` LEFT JOIN (SELECT id, COUNT(id) AS commentnum FROM comment GROUP BY id) AS co ON all.id = co.id WHERE all.sid = '1' AND EXISTS (SELECT 1 FROM collection WHERE collection.id = all.id AND collection.account = ?) LIMIT ?, ?;"
      //调用db.query()执行sql语句
      db.query(sql, [account, start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err);
        }
        //执行sql语句成功
        else {
          // 查询结果为空
          if (!results || results.length === 0 || results[0].id == null) {
            const data = {
              counts: 0,
              pageSize: pageSize,
              totalPages: 0,
              page: page
            };
            const back = {
              code: '1',
              msg: '没有收藏',
              data: data,
              datas: []  // 返回一个空数组表示没有数据
            };
            res.send(back);
          } else {
            // 定义datas内容
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
        }
      })
    }
  })
}

//定义在收藏界面进行搜索景点的函数
exports.getSearchScene = (req, res) => {
  //从页面获取关键词
  const keyword = req.query.keyword.trim()
  //拼接关键词
  const searchKeyword = '%' + keyword + '%'
  //获得当前页数
  const page = parseInt(req.query.page, 10)
  //获取用户名
  const account = req.user.account
  //定义每页显示的条数
  const pageSize = 6
  const start = (page - 1) * pageSize; // 计算起始位置
  //定义查询总条数的语句
  const sqlCount = "SELECT COUNT(*) AS total FROM `all` LEFT JOIN collection ON all.id = collection.id WHERE sid = '0' and (intro LIKE ? or name like ?) and account = ? "
  //调用db.query()执行sql语句
  db.query(sqlCount, [searchKeyword, searchKeyword, account], (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      //定义查询用户收藏的景点数据的sql语句
      const sql = "SELECT all.id, all.name, all.rank, all.address, all.opening_hours, all.picture, all.Longitude, all.Latitude, co.commentnum FROM `all` LEFT JOIN (SELECT id, COUNT(id) AS commentnum FROM comment GROUP BY id) AS co ON all.id = co.id WHERE all.sid = '0' AND EXISTS (SELECT 1 FROM collection WHERE collection.id = all.id AND collection.account = ?) and (all.intro like ? or all.name like ?)LIMIT ?, ?;"
      //调用db.query()执行sql语句
      db.query(sql, [account, searchKeyword, searchKeyword, start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err);
        }
        //执行sql语句成功
        else {
          // 查询结果为空
          if (!results || results.length === 0 || results[0].id == null) {
            const data = {
              counts: 0,
              pageSize: pageSize,
              totalPages: 0,
              page: page
            };
            const back = {
              code: '1',
              msg: '没有收藏',
              data: data,
              datas: []  // 返回一个空数组表示没有数据
            };
            res.send(back);
          } else {
            // 定义datas内容
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
        }
      })
    }
  })
}

//定义在收藏界面进行搜索美食的函数
exports.getSearchFood = (req, res) => {
  //从页面获取关键词
  const keyword = req.query.keyword.trim()
  //拼接关键词
  const searchKeyword = '%' + keyword + '%'
  //获得当前页数
  const page = parseInt(req.query.page, 10)
  //获取用户名
  const account = req.user.account
  //定义每页显示的条数
  const pageSize = 6
  const start = (page - 1) * pageSize; // 计算起始位置
  //定义查询总条数的语句
  const sqlCount = "SELECT COUNT(*) AS total FROM `all` LEFT JOIN collection ON all.id = collection.id WHERE sid = '1' and (intro LIKE ? or name like ?) and collection.account = ? "
  //调用db.query()执行sql语句
  db.query(sqlCount, [searchKeyword, searchKeyword, account], (err, results) => {
    if (err) {
      return res.cc(err);
    } else {
      const total = results[0].total;
      const totalPages = Math.ceil(total / pageSize); // 计算总页数
      //定义是否已收藏的sql语句
      const sqlLike = 'select * from collection where id=? AND account=?'
      //定义查询用户收藏的景点数据的sql语句
      const sql = "SELECT all.id, all.name, all.rank, all.address, all.opening_hours, all.picture, all.Longitude, all.Latitude, co.commentnum FROM `all` LEFT JOIN (SELECT id, COUNT(id) AS commentnum FROM comment GROUP BY id) AS co ON all.id = co.id WHERE all.sid = '1' AND EXISTS (SELECT 1 FROM collection WHERE collection.id = all.id AND collection.account = ?) and (all.intro like ? or all.name like ?)LIMIT ?, ?;"
      //调用db.query()执行sql语句
      db.query(sql, [account, searchKeyword, searchKeyword, start, pageSize], (err, results) => {
        //执行sql语句失败
        if (err) {
          return res.cc(err);
        }
        //执行sql语句成功
        else {
          // 查询结果为空
          if (!results || results.length === 0 || results[0].id == null) {
            const data = {
              counts: 0,
              pageSize: pageSize,
              totalPages: 0,
              page: page
            };
            const back = {
              code: '1',
              msg: '没有收藏',
              data: data,
              datas: []  // 返回一个空数组表示没有数据
            };
            res.send(back);
          } else {
            // 定义datas内容
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
        }
      })
    }
  })
}


//定义收藏的函数
exports.postSave_Delete = (req, res) => {
  //从页面获取信息
  const Allinfo = req.body
  // 定义 SQL 语句，查询该美食是否已被收藏
  const sqlStr = 'select * from collection where id=? AND account=?'
  db.query(sqlStr, [Allinfo.id, Allinfo.account], (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err)
    }
    // 判断该美食是否已被收藏
    if (results.length > 0) {
      //定义删除表中数据的sql语句
      const sql = 'delete from collection where id=? and account=?'
      //从表中删除数据代表取消收藏
      db.query(sql, [Allinfo.id, Allinfo.account], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err)
        }
        else {
          return res.send({
            code: '0',
            msg: '已取消收藏'
          })
        }
      })
    }
    else {
      //定义插入collection数据库的sql语句
      const sql = 'insert into collection set ?'
      //执行sql语句
      db.query(sql, { id: Allinfo.id, account: Allinfo.account }, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err)
        }
        else {
          res.send({
            code: '0',
            msg: '已收藏'
          })
        }
      })
    }
  })
}

