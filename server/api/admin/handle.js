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
  async loginHandle(req, res) {
    const { username, password } = req.body
    const isUser = await AdminUserModel.findOne({ username }).select('+password')
    if (!isUser) {
      response(res, 1, '用户名不存在')
      return
    }

    const user = bcrypt.compareSync(password, isUser.password)
    if (!user) {
      response(res, 1, '密码错误')
      return
    }

    const token = jwt.sign({
      id: String(isUser.id),
    }, req.app.get('secret'))
    response(res, 0, '登陆成功', { username }, token)
  },

  //登录验证
  async authHandle(req, res) {
    response(res, 0, '身份验证成功')
  },

  // 文件上传
  async uploadHandle(req, res) {
    let file = req.file
    // if (!flie) {
    //   response(res, 1, '上传文件失败')
    //   return
    // }
    file.url = `http://localhost:3000/admin/${file.pathUrl}/${file.filename}`
    response(res, 0, '上传成功', file)
  },

  /**
   * =========================分类=API========================================
   */
  // 创建或修改分类
  async cateEditHandle(req, res) {
    const { name, parent } = req.body
    let model = {} //创建或修改对应模型的对象
    let isExist = false //判断分类是否存在

    // 若parent 为空，则是添加一级分类，否则是二级分类
    if (!parent) {
      let totalCate = await CategoryModel.find()
      totalCate.forEach(obj => {
        if (obj.name === name && !obj.parent) {
          isExist = true
        }
      })
      if (isExist) {
        response(res, 1, `已存在一级分类：${name}`)
        return
      }
      model = { name }
    } else {
      const cate = await CategoryModel.find().where({ name, parent })
      isExist = cate.length === 0 ? false : true
      if (isExist) {
        response(res, 1, `已存在二级分类：${name}`)
        return
      }
      model = { name, parent }
    }
    // 根据路径判断更新或修改操作
    let data, msg
    if (req.path.indexOf('add') != -1) {
      data = await CategoryModel.create(model)
      msg = '创建分类成功'
    } else {
      data = await CategoryModel.findByIdAndUpdate(req.body.id, model)
      msg = '修改分类成功'
    }
    response(res, 0, msg, data)
  },

  // 删除分类
  async cateDeleteHandle(req, res) {
    const id = req.query.id
    let model = await CategoryModel.findById(id)
    // 若是二级分类直接删除, 一级分类则删除自身和所有二级分类
    if (model.parent) {
      await CategoryModel.deleteOne(id)
    } else {
      await CategoryModel.deleteMany({
        // $or操作符操作在一个数据或者多个表达式并且 需要选择至少一个满足条件的表达式，
        $or: [
          { _id: id },
          { parent: id }
        ]
      })
    }
    response(res, 0, '删除分类成功')
  },

  // 查询所有一级分类
  async levelOneHandle(req, res) {
    let totalCate = await CategoryModel.find()
    let levelOne = totalCate.filter(data => !data.parent)
    response(res, 0, '获取一级分类成功', levelOne)
  },

  // 查询所有二级分类
  async levelTwoHandle() {
    const id = req.query.id
    let totalCate = await CategoryModel.find()
    let levelTwo = totalCate.filter(data => String(data.parent) === id && data.parent)
    response(res, 0, '获取二级分类成功', levelTwo)
  },

  // 获取分类详细
  async cateInfoHandle(req, res) {
    const id = req.query.id
    let item = await CategoryModel.findById(id)
    response(res, 0, '获取分类详细成功', item)
  },

  /**
   * ======================装备=API====================================
   */
  // 创建或修改装备
  async itemEditHandle(req,res) {
    const { id, name, icon } = req.body
    const isExist = await ItemModel.findOne({ name })
    // 添加不允许同名
    if (isExist && !id) {
      response(res, 1, '该装备已存在')
      return
    }
    let msg, data
    if (id) {
      data = await ItemModel.findByIdAndUpdate(id, { name, icon })
      msg = '修改成功'
    } else {
      data = await ItemModel.create({ name, icon })
      msg = '添加成功'
    }
    response(res, 0, msg, data)
  },

  // 删除装备
  async itemDeleteHandle(req, res) {
    const id = req.query.id
    const item = await ItemModel.findByIdAndDelete(id)
    response(res, 0, '删除装备成功', item)
  },

  // 获取装备列表
  async itemListHandle(req, res) {
    // 获取页数 默认1
    let page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数 默认5
    let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    let skip = (page - 1) * pageSize
    const itemTotal = await ItemModel.find().countDocuments() //countDocuments()计算集合中的文档数
    const itemList = await ItemModel.find().skip(skip).limit(pageSize)
    response(res, 0, '获取装备列表成功', { itemTotal, itemList })
  },

  // 装备详细
  async itemInfoHandle(req, res) {
    const id = req.query.id
    const item = await ItemModel.findById(id)
    response(res, 0, '获取装备详细成功', item)
  },

  /**
   * ==================英雄=API===================================
   */
  // 添加或修改英雄
  async heroEditHandle(req, res) {
    const { id, model } = req.body
    const isExist = await HeroModel.findOne({ name: model.name })
    if (isExist && !id) {
      response(res, 1, '该英雄已存在')
      return
    }
    let hero, msg
    if (id) {
      hero = await HeroModel.findByIdAndUpdate(id, model)
      msg = '更新英雄成功'
    } else {
      hero = await HeroModel.create(model)
      msg = '新建英雄成功'
    }
    response(res, 0, msg, hero)
  },

  // 删除英雄
  async heroDeleteHandle(req, res) {
    const id = req.query.id
    const hero = await HeroModel.findByIdAndDelete(id)
    response(res, 0, '删除英雄成功', hero)
  },

  // 获取英雄详情
  async heroInfoHandle(req, res) {
    const id = req.query.id
    const hero = await HeroModel.findById(id)
    response(res, 0, '获取英雄详情成功', hero)
  },

  // 获取英雄列表
  async heroListHandle(req, res) {
    // 获取页数 默认1
    let page = req.query.page ? Number(req.query.page) : 1
    // 每页的条数 默认5
    let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5
    // 跳过的条数
    let skip = (page - 1) * pageSize
    // 构造查询对象
    let name = req.query.name
    let searchQuery = {}
    if (name) {
      searchQuery.name = new RegExp(name)  //  {  name: /xxxx/ }
    }

    // 获取当前查询英雄总数量
    const heroTotal = await HeroModel.find(searchQuery).countDocuments()
    const heroList = await HeroModel.aggregate([
      {
        $lookup: {
          // 关联 categories表, 注意不是模型名category
          from: 'categories',
          // 主表关联的字段
          localField: 'categories',
          // 被关联表要关联的字段
          foreignField: '_id',
          // 关联查询出来的放在 categoryInfo属性中
          as: 'categoryInfo'
        }
      },
      { $match: searchQuery },
      // 跳过条数
      { $skip: skip },
      { $limit: pageSize }
    ])
    response(res, 0, '获取英雄数据成功', { heroTotal, heroList })
  },

  // -----获取英雄二级分类 ---- 
  // async heroCateHandle(req, res) {
  //   // 找出英雄下的子分类
  //   const heroCate = await CategoryModel.find({ parent: "5ef9a67208fb182c3c173e77" })
  //   response(res, 0, '获取英雄二级分类成功', heroCate)
  // },

  /**
   * ========================广告位=API============================
   */
  // 添加或修改广告位
  async adsEditHandle(req, res) {
    const { id, name, items } = req.body
    const isExist = await AdModel.findOne({ name })
    if (isExist && !id) {
      response(res, 1, '该广告位已存在')
      return
    }
    let data, msg
    if (id) {
      // 修改广告位
      data = await AdModel.findByIdAndUpdate(id, { name, items })
      msg = '更新广告位成功'
    } else {
      // 添加广告位
      data = await AdModel.create({ name, items })
      msg = '新建广告位成功'
    }
    response(res, 0, msg, data)
  },

  // 获取广告位列表
  async adsListHandle(req, res) {
    const totalItem = await AdModel.find()
    response(res, 0, '获取广告位列表成功', totalItem)
  },

  // 删除广告位
  async adsDeleteHandle(req, res) {
    const id = req.query.id
    const data = await AdModel.findByIdAndDelete(id)
    response(res, 0, '删除广告位成功', data)
  },

  // 获取广告位详情
  async adsInfoHandle(req, res) {
    const id = req.query.id
    const [err, item] = await awaitResult(AdModel.findById(id))
    // 查询出错
    if (err) {
      res.status(422).send('服务器查询出错~')
      return
    }
    response(res, 0, '获取广告位详情成功', item)
  },

  /**
   * =====================文章=API=======================
   */
  // 添加或修改文章
  async articleEditHandle(req, res) {
    const { id, title, content, hot, categories } = req.body.model
    const isExist = await ArticleModel.findOne({ title })
    if (isExist && !id) {
      response(res, 1, '该文章已存在')
      return
    }
    let data, msg
    if (id) {
      data = await ArticleModel.findByIdAndUpdate(id, { title, content, hot, categories })
      msg = '更新文章成功'
    } else {
      data = await ArticleModel.create({ title, content, hot, categories })
      msg = '新建文章成功'
    }
    response(res, 0, msg, data)
  },

  // 删除文章
  async articleDeleteHandle(req, res) {
    const id = req.query.id
    const data = await ArticleModel.findByIdAndDelete(id)
    response(res, 0, '删除文章成功', data)
  },

  // 获取文章列表
  async articleListHandle(req, res) {
    // 获取第几页数据, 不传为第一页
    let page = req.query.page ? Number(req.query.page) : 1
    // 每页多少条数据, 不传获取5条
    let pageSize = Number(req.query.pageSize) ? Number(req.query.pageSize) : 5
    // 需要跳过的数据条数
    let skip = (page - 1) * pageSize
    // 数据库中装备总数
    const articleTotal = await ArticleModel.find().countDocuments()
    const articleList = await ArticleModel.aggregate([
      {
        $lookup: {
          // 关联 categories表, 注意不是模型名category
          from: 'categories',
          // 主表关联的字段
          localField: 'categories',
          // 被关联表要关联的字段
          foreignField: '_id',
          // 关联查询出来的放在 categoryInfo属性中
          as: 'categoryInfo'
        }
      },
      // 跳过条数
      { $skip: skip },
      { $limit: pageSize }
    ])
    response(res, 0, '获取文章列表成功', { articleTotal, articleList })
  },

  // 获取文章详情
  async articleInfoHandle(req, res) {
    const id = req.query.id
    const [err, data] = await awaitResult(ArticleModel.findById(id))
    // 查询出错
    if (err) {
      res.status(422).send('服务器查询出错~')
      return
    }
    response(res, 0, '获取文章详情成功', data)
  },

  /**
   * 管理员
   */
  // 添加或修改管理员
  async userEditHandle(req, res) {
    // 获取管理员信息
    const { username, password, id } = req.body
    const isExits = await AdminUserModel.findOne({ username })
    // 如果是添加, 有同名的不允许添加
    if (isExits && !id) {
      response(res, 1, '该管理员已存在')
      return
    }
    let user, msg
    if (id) {
      // 验证密码
      const user = await AdminUserModel.findById(id).select('+password')
      const isPassword = bcrypt.compareSync(password, user.password)
      // 密码无效
      if (!isPassword) {
        response(res, 1, '密码错误')
        return
      }
      user = await UserModel.findByIdAndUpdate(id, { username, password })
      msg = '更新管理员成功'
    } else {
      user = await UserModel.create({ username, password })
      msg = '新建管理员成功'
    }
    response(res, 0, msg, user)
  },

  // 删除管理员
  async userDeleteHandle(req, res) {
    const id = req.query.id
    const user = await AdminUserModel.findByIdAndDelete(id)
    response(res, 0, '删除管理员成功', user)
  },

  // 获取管理员列表
  async userListHandle(req, res) {
    const totalUser = await AdminUserModel.find()
    response(res, 0, '获取管理员列表成功', totalUser)
  },

  // 获取管理员详情
  async userInfoHandle(req, res) {
    const id = req.query.id
    const [err, item] = await awaitResult(AdminUserModel.findById(id))
    if (err) {
      res.status(422).send('服务器查询出错~')
      return
    }
    response(res, 0, '获取管理员详情成功', item)
  },
}

