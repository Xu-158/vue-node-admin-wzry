import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: "*",
    name: "404",
    component: () => import('@/views/404')
  },

  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/articles/:id',
        name: 'article',
        component: () => import('../views/Article.vue'),
        props: true
      }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'hero',
    component: () => import('../views/Hero.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes,
  // 路由改变滚动到顶部，而返回上一级时滚动到之前的位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 防止相同路由跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
