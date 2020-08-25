const express = require('express')
const app = express()

app.set('secret','xxuujjjfff158')

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use('/admin',require('./api/admin/router'))

require('./models/db')(app)
// require('./api/admin/index')(app)
require('./api/web/index')(app)

app.listen(3000, () => {
  console.log('RUN AT  http://127.0.0.1:3000');
})