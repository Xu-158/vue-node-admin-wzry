const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String ,default:""},
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 默认值是文章创建时间,存储的是时间戳
  date: {
    type: String,
    default: +new Date()
  },
  hot: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
},
)

module.exports = mongoose.model('Article', schema)