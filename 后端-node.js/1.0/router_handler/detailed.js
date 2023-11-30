const db = require('../db/index');


// exports.getdetailes = (req, res) => {
//     const id = req.params.id;
//     sql = 'SELECT * from `all` where id=?'
//     db.query(sql, [id], (err, results) => {
//         if (err) return res.cc(err)
//         if (results.length !== 1) return res.cc('获取失败！')
//         res.send({
//             code: '0',
//             msg: '获取成功！',
//             data: results[0],
//           })
//     })
// }

// exports.getcomments = (req, res) => {
//     const id = req.params.id;
//     sql = 'select * from `comment` where id=? order by likenum '
//     db.query(sql, [id], (err, results) => {
//         if (err) return res.cc(err)
        
//         res.send({
//             code: '0',
//             msg: '获取成功！',
//             data: results,
//     })
//     })
// }


exports.postcomment = (req, res) => {
    const jksb = req.body
  sql = 'insert into comment set ?'
  db.query(sql,{
    rating:jksb.rating,
    content:jksb.content,
    picture1:jksb.picture1,
    picture2:jksb.picture2,
    picture3:jksb.picture3,
    id:jksb.id,
    account:req.user.account,
    userid:req.user.userid,
    nickname:req.user.nickname,
    authenticity:0,
    sid:jksb.sid,
    likenum:0,
    dislikenum:0,
    
  },(err, results) => {
    if (err) return res.cc(err)
    res.cc('评论成功！', '0')
    })

}


exports.getaccount = (req, res) => {  
  const account = req.params.account;
  const sql = `select nickname, avatar, credit from user where account=?`;  
  // 调用 db.query() 执行 SQL 语句  
  db.query(sql, [account], (err, results) => {  
    // 执行 SQL 语句失败  
    if (err) return res.cc(err);  
    // 执行 SQL 语句成功，但是查询的结果可能为空  
    if (results.length !== 1) return res.cc('获取用户信息失败！');  
    // 用户信息获取成功  
    res.send({  
      code: '0',  
      msg: '获取其他用户信息成功！',  
      data: results[0],  
    });  
  });  
};