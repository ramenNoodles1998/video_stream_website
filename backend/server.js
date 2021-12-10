const express = require('express')
const cors = require('cors')
const routeSetup = require('./routes/routes')

const app = express()
const port = 3000

app.use(cors())

routeSetup(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})