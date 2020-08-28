const handle = require('./handle')
const express = require('express')

const router = express.Router()

// 注册路由规则
router.use(express.static('public'))

// // 首页轮播图
// router.get('/strategy/home', handle.strategyAdsHandle)

// 首页轮播图
router.get('/ads/home', handle.homeAdsHandle)
// 首页新闻数据
router.get('/news/listOne', handle.newsListOneHandle)
// 首页新闻详情
router.get('/article/item', handle.newsItemHandle)
// // 新闻列表
// router.get('/news/listTwo', handle.newsListTwoHandle)
// 首页英雄数据
router.get('/hero/listOne', handle.heroListOneHandle)
// 英雄详情
router.get('/hero/item', handle.heroItemHandle)
// 英雄列表分类
router.get('/hero/cate', handle.heroCateHandle)
// // 英雄列表
// router.get('/hero/listTwo', handle.heroListTwoHandle)
// // 赛事中心二级分类
// router.get('/match/cate', handle.matchCateHandle)
// // 赛事中心文章
// router.get('/match/article', handle.matchArticleHandle)


module.exports = router

