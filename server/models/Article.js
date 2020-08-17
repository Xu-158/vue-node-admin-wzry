const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Article', schema)