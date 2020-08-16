const express = require('express')

const app = express()

app.set('secret','xxuujjjfff158')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)


app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})