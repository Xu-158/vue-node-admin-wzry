const AdModel = require('../../models/Ad')
const CategoryModel = require('../../models/Category')
const ArticleModel = require('../../models/Article')
const HeroModel = require('../../models/Hero')

const mongoose = require('mongoose')

const response = require('../../utils/response')
const random = require('../../utils/random')
const awaitResult = require('../../utils/error')

module.exports = {

  // 首页广告
  async homeAdsHandle(req, res) {
    const homeAds = await AdModel.findById('5f32a0cc649ddc57081cd4bc')
    response(res, 0, '获取首页广告数据成功', homeAds.items)
  },

  // 首页新闻详情
  async newsItemHandle(req, res) {
    const news = await ArticleModel.findById(req.query.id)
    console.log(req.params);
    response(res, 0, '获取新闻详细成功', news)
  },

  // 首页新闻数据
  async newsListOneHandle(req, res) {
    // 查询新闻二级分类，以及属于该分类下的所有文章, 每个二级分类取前5篇文章
    const catesData = await CategoryModel.aggregate([
      { $match: { parent: mongoose.Types.ObjectId('5f3be8f7633d9d2d18ac6cd1') } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // $addFields 本意是添加字段，这里用来修改 newslist字段，用于取每个二级分类下的前5篇文章
      {
        $addFields: {
          // $newsList 表示关联查出来的 newsList, $slice表示切割
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    // 添加一个热门分类, 
    catesData.unshift({
      name: '热门',
      newsList: await ArticleModel.find().where({ hot: true })
        .populate('categories').limit(5).lean()
    })
    // 给每篇文章添加一个 categoryName 字段, 热门分类就取最后一个分类的名字
    catesData.forEach(cate => {
      cate.newsList.forEach(news => {
        news.categoryName = cate.name === '热门' ?
          news.categories[news.categories.length - 1].name : cate.name
      })
    })

    response(res, 0, '获取首页新闻数据成功', catesData)
  },


  // 首页英雄数据
  async heroListOneHandle(req, res) {
    // 查询英雄二级分类，以及属于该分类下的所有英雄
    const catesData = await CategoryModel.aggregate([
      { $match: { parent: mongoose.Types.ObjectId('5f3be900633d9d2d18ac6cd2') } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }
    ])
    // 添加一个热门分类
    catesData.unshift({
      name: '热门',
      heroList: await HeroModel.find().where({ hot: true }).limit(10)
    })
    response(res, 0, '获取首页英雄数据成功', catesData)
  },

  // 英雄列表分类
  async heroCateHandle(req, res) {
    const data = await CategoryModel.find({ parent: mongoose.Types.ObjectId('5f3be900633d9d2d18ac6cd2') })
    response(res, 0, '获取首页英雄列表分类', data)
  },

  // 获得英雄详细
  async heroItemHandle(req, res) {
    const hero = await HeroModel.findById(req.query.id).populate('categories items1 items2 partners.hero').lean()
    response(res, 0, '获取英雄详细成功', hero)
  }

}