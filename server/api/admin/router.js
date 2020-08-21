const express = require('express')
const handle = require('./handle.js')
const path = require('path')

// 创建路有对象
const router = express.Router()

// 托管静态文件

// 文件上传

// 登陆
router.post('/auth',handle.auth)
router.post('/login',)

// 分类

// 装备

// 英雄

// 广告位

// 文章

// 管理员

module.exports = router


