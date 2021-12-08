const express = require('express')
const app = express()
const cors = require('cors')
const through = require('through2')
const port = 3000

app.use(cors())

let bufferList = [] 

function write(line, _, next) {
  bufferList.push(line)

  next()
}

function end(done) {
  done()
}

const mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "roman123456"
})

con.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
})

app.post('/', (req, res) => {
  req.pipe(through(write, end))
  setTimeout(() => {
    req.unpipe(through)
    through.obj().end()
    res.send(bufferList)
  }, 1000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})