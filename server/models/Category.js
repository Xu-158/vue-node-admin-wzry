const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

schema.virtual('children', { //定义虚拟字段
  localField: '_id',// 内键,schema对应的模型parent的_id
  foreignField: 'parent',//外键,关联模型Category的parent字段
  justOne: false, // 只查询一条数据
  ref: 'Category'// 关联的模型
})

schema.virtual('newsList', {//定义虚拟字段
  localField: '_id',// 内键,schema对应的模型parent的_id
  foreignField: 'parent',//外键,关联模型News的parent字段
  justOne: false,// 只查询一条数据
  ref: 'Article'// 关联的模型
})

module.exports = mongoose.model('Category', schema)
