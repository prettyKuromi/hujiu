const db = require('../db/index');
//(已测)
exports.release =  (req, res) => {  
  const jksb = req.body;
  console.log(jksb)
  const sqlStr = 'select * from `all` where name=?'
  db.query(sqlStr, jksb.name, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0) {
      return res.cc('已经有人上传')
    }
    const sql =  'insert into `all` set ?'
    //sid:0为景点，1为美食
    db.query(sql, {  name: jksb.name, address: jksb.address, opening_hours:jksb.opening_hours,picture: jksb.picture, sid: jksb.sid, rank:0, intro: 0,Longitude:0,Latitude:0}, (err, results) => {  
        if (err) return res.cc(err);  
        if (results.affectedRows !== 1) return res.cc('添加失败！');  
        res.cc('添加成功！', '0');  
    });
  });
};
