const express = require('express')
const handle = require('./handle.js')
const path = require('path')
const handleMulter = require('../../utils/multer')

const upload = handleMulter()

// 创建路有对象
const router = express.Router()

// 托管静态文件
router.use('/uploads/images', express.static(path.join(__dirname, '../../uploads/images')))

// 登陆
router.post('/auth', handle.auth, handle.authHandle)
router.post('/login', handle.loginHandle)

// 文件上传
router.post('/uploads/:type', handle.auth, upload.single('file'), handle.uploadHandle)

// 分类
router.post('/categories/add', handle.auth, handle.cateEditHandle)
router.put('/categories/update', handle.auth, handle.cateEditHandle)
router.delete('/categories/delete', handle.auth, handle.cateDeleteHandle)
router.get('/categories/levelOne', handle.auth, handle.levelOneHandle)
router.get('/categories/levelTow', handle.auth, handle.levelTwoHandle)
router.get('/categories/item', handle.auth, handle.cateInfoHandle)

// 装备
router.post('/item/add', handle.auth, handle.itemEditHandle)
router.put('/item/update', handle.auth, handle.itemEditHandle)
router.delete('/item/delete', handle.auth, handle.itemDeleteHandle)
router.get('/item/list', handle.auth, handle.itemListHandle)
router.get('/item/item', handle.auth, handle.itemInfoHandle)

// 英雄
router.post('/hero/add', handle.auth, handle.heroEditHandle)
router.put('/hero/update', handle.auth, handle.heroEditHandle)
router.delete('/hero/delete', handle.auth, handle.heroDeleteHandle)
router.get('/hero/list', handle.auth, handle.heroListHandle)
router.get('/hero/item', handle.auth, handle.heroInfoHandle)
// router.get('/hero/cate', handle.auth, handle.heroCateHandle)

// 广告位
router.post('/ads/add', handle.auth, handle.adsEditHandle)
router.delete('/ads/delete', handle.auth, handle.adsDeleteHandle)
router.put('/ads/update', handle.auth, handle.adsEditHandle)
router.get('/ads/list', handle.auth, handle.adsListHandle)
router.get('/ads/item', handle.auth, handle.adsInfoHandle)

// 文章
router.post('/article/add', handle.auth, handle.articleEditHandle)
router.put('/article/update', handle.auth, handle.articleEditHandle)
router.delete('/article/delete', handle.auth, handle.articleDeleteHandle)
router.get('/article/list', handle.auth, handle.articleListHandle)
router.get('/article/item', handle.auth, handle.articleInfoHandle)
// router.get('/article/cate', handle.auth, handle.articleCateHandle)

// 管理员
router.post('/user/add', handle.auth, handle.userEditHandle)
router.delete('/user/delete', handle.auth, handle.userDeleteHandle)
router.put('/user/update', handle.auth, handle.userEditHandle)
router.get('/user/list', handle.auth, handle.userListHandle)
router.get('/user/item', handle.auth, handle.userInfoHandle)

module.exports = router


