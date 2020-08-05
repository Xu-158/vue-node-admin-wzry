module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams:true
  })

  router.post('/', async (req, res) => {
    const name = req.body.name
    if (name != '' && name != null) {
      const model = await req.Model.create(req.body)
      res.send(model)
    } else {
      res.send(null)
    }
  })

  router.put('/:id', async (req, res) => {
    const name = req.body.name
    if (name != '' && name != null) {
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    } else {
      res.send(null)
    }
  })

  router.get('/', async (req, res) => {
    const queryOption = {}
    if(req.Model.modelName === 'Category'){
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
}