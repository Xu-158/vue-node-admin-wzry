module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    const queryOption = {}
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent'
    }
    const list = await req.Model.find().setOptions(queryOption).limit(10)
    res.send(list)
  })

  router.get('/:id', async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })

  router.delete('/:id', async (req, res) => {
    const result = await req.Model.findByIdAndDelete(req.params.id)
    res.send(result)
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../modules/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 根据用户名找到用户
    const AdminUser = require('../../modules/AdminUser')
    // findOne({ username }).select('+password') ‘+’强制选中字段 ‘-’排除
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: "用户不存在"
      })
    }

    // 校验密码
    const isValid = require('bcryptjs').compareSync(password,user.password)
    if(!isValid){
      return res.status(422).send({
        message:"密码不正确"
      })
    }

    // 返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({id:user._id,_id:user._id},app.get('secret'))
    res.send({token,username})
  })
}