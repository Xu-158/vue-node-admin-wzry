const multer = require('multer')
const path = require('path')

function handleMulter () {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 根据上传的mimitype字段判断上传的是图片还是视频
      file.pathUrl = 'uploads/images'
      if (file.mimetype.indexOf('video') != -1) {
        file.pathUrl = 'uploads/video'
      }
      cb(null, path.join(__dirname, '../', file.pathUrl))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +  file.originalname);
    }
  })
  const upload = multer({ storage })

  return upload
  
}

module.exports =  handleMulter
