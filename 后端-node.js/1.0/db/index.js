const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'hjcy_db',
  password: '123456',
  database: 'hjcy_db',
})

module.exports = db
