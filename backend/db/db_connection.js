const mysql = require('mysql')

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "roman123456",
  database: 'video_stream'
})

con.connect((err) => {
  if (err) throw err
  console.log('connected')
})

module.exports = con