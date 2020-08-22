const multer = require('multer')
const path = require('path')

function handleMulter() {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      file.pathUrl = 'upload/images'
      if (file.mimetype.indexOf('video') != -1) {
        file.pathUrl = 'upload/video'
      }
      cb(null, path.join(__dirname, '../', file.pathUrl))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  const upload = multer({ storage })
  return upload
}

module.exports = handleMulter
