const express = require('express')

const app = express()

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin/index')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})