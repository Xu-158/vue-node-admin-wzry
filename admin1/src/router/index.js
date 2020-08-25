import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { existToken } from '../utils/auth'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { isPublic: true, title: '登录' }
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404' }
  },

  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '首页' }
      }
    ]
  },

  {
    path: '/items',
    component: () => import('@/views/Layout'),
    redirect: '/items/itemAdd',
    name: 'items',
    meta: { title: '物品管理' },
    children: [
      {
        path: 'itemAdd',
        name: 'item-add',
        component: () => import('@/views/items/ItemEdit'),
        meta: { title: '新建装备' }
      },
      {
        path: 'itemUpdate/:id',
        name: 'item-update',
        props: true,
        component: () => import('@/views/items/ItemEdit'),
        meta: { title: '编辑装备' }
      },
      {
        path: 'itemList',
        name: 'item-list',
        component: () => import('@/views/items/ItemList'),
        meta: { title: '装备列表' }
      },
    ]
  },

  {
    path: '/resource',
    component: () => import('@/views/Layout'),
    redirect: '/resource/articleAdd',
    name: 'resource',
    meta: { title: '资源管理' },
    children: [
      {
        path: 'articleAdd',
        name: 'article-add',
        component: () => import('@/views/resource/ArticleEdit'),
        meta: { title: '新建文章' }
      },
      {
        path: 'articleUpdate/:id',
        name: 'article-update',
        props: true,
        component: () => import('@/views/resource/ArticleEdit'),
        meta: { title: '编辑文章' }
      },
      {
        path: 'articleList',
        name: 'article-list',
        component: () => import('@/views/resource/ArticleList'),
        meta: { title: '文章列表' }
      },
    ]
  },

  {
    path: '/hero',
    component: () => import('@/views/Layout'),
    redirect: '/hero/heroAdd',
    name: 'hero',
    meta: { title: '英雄管理' },
    children: [
      {
        path: 'heroAdd',
        name: 'hero-add',
        component: () => import('@/views/hero/HeroEdit'),
        meta: { title: '新建英雄' }
      },
      {
        path: 'heroUpdate/:id',
        name: 'hero-update',
        props: true,
        component: () => import('@/views/hero/HeroEdit'),
        meta: { title: '编辑英雄' }
      },
      {
        path: 'heroList',
        name: 'hero-list',
        component: () => import('@/views/hero/HeroList'),
        meta: { title: '英雄列表' }
      },
    ]
  },

  {
    path: '/system',
    component: () => import('@/views/Layout'),
    redirect: '/system/cateAdd',
    name: 'system',
    meta: { title: '系统设置' },
    children: [
      {
        path: 'cateAdd',
        name: 'cate-add',
        component: () => import('@/views/system/CateEdit'),
        meta: { title: '新建分类' }
      },
      {
        path: 'cateUpdate/:id',
        name: 'cate-update',
        props: true,
        component: () => import('@/views/system/CateEdit'),
        meta: { title: '编辑分类' }
      },
      {
        path: 'cateList',
        name: 'cate-list',
        component: () => import('@/views/system/CateList'),
        meta: { title: '分类列表' }
      },
      {
        path: 'adsAdd',
        name: 'ads-add',
        component: () => import('@/views/system/AdsEdit'),
        meta: { title: '新建广告位' }
      },
      {
        path: 'adsUpdate/:id',
        name: 'ads-update',
        props: true,
        component: () => import('@/views/system/AdsEdit'),
        meta: { title: '编辑广告位' }
      },
      {
        path: 'adsList',
        name: 'ads-list',
        component: () => import('@/views/system/AdsList'),
        meta: { title: '广告位列表' }
      },
      {
        path: 'userAdd',
        name: 'user-add',
        component: () => import('@/views/system/UserEdit'),
        meta: { title: '新建管理员' }
      },
      {
        path: 'userUpdate/:id',
        name: 'user-update',
        props: true,
        component: () => import('@/views/system/UserEdit'),
        meta: { title: '编辑管理员' }
      },
      {
        path: 'userList',
        name: 'user-list',
        component: () => import('@/views/system/UserList'),
        meta: { title: '管理员列表' }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {

  NProgress.start()

  // 动态设置标题
  document.title = to.meta.title ? to.meta.title : 'admin'

  // 验证token
  // const token = await 
  // if (!to.meta.isPublic && !sessionStorage.token) {
  //   return next('/login')
  // }
  const token = await existToken()

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if ('/login'.indexOf(to.path) != -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

// 禁止相同路由跳转（会导致错误警告）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router