const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Thesaneman12_',
  database: 'node-complete',
})

module.exports = pool.promise()
