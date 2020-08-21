const AdModel = require('../../models/Ad')
const AdminUserModel = require('../../models/AdminUser')
const ArticleModel = require('../../models/Article')
const CategoryModel = require('../../models/Category')
const HeroModel = require('../../models/Hero')
const ItemModel = require('../../models/Item')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const awaitResult = require('../../utils/error')
const response = require('../../utils/response')

// 用于 生成token 和 解密token 的字符串
const SECRET = 'hdfgsdfgsdf2121sfdas'

module.exports = {
  // 验证token的中间件函数
  async auth(req, res, next) {
    const token = String(req.headers.authorization)
    // 解析token
    jwt.verify(token, req.app.get('secret'), async (err, token) => {
      if (err) {
        response(res, 1, '未登录')
        return
      }
      req.token = token
      next()
    })
  },

  // 登陆
  async loginHandle(req,res){
    let usename = req.body.username
    let password = req.body.password
    
  }



}

