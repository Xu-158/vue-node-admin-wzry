import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta:{isPublic:true}
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '/categories/create',
        component: () => import('@/views/CategoryCreate')
      },
      {
        path: '/categories/list',
        component: () => import('@/views/CategoryList')
      },
      {
        path: '/categories/edit/:id',
        props: true,
        component: () => import('@/views/CategoryCreate')
      },

      {
        path: '/items/create',
        component: () => import('@/views/ItemCreate')
      },
      {
        path: '/items/list',
        component: () => import('@/views/ItemList')
      },
      {
        path: '/items/edit/:id',
        props: true,
        component: () => import('@/views/ItemCreate')
      },

      {
        path: '/heroes/create',
        component: () => import('@/views/HeroCreate')
      },
      {
        path: '/heroes/list',
        component: () => import('@/views/HeroList')
      },
      {
        path: '/heroes/edit/:id',
        props: true,
        component: () => import('@/views/HeroCreate')
      },

      {
        path: '/articles/create',
        component: () => import('@/views/ArticleCreate')
      },
      {
        path: '/articles/list',
        component: () => import('@/views/ArticleList')
      },
      {
        path: '/articles/edit/:id',
        props: true,
        component: () => import('@/views/ArticleCreate')
      },

      {
        path: '/ads/create',
        component: () => import('@/views/AdCreate')
      },
      {
        path: '/ads/list',
        component: () => import('@/views/AdList')
      },
      {
        path: '/ads/edit/:id',
        props: true,
        component: () => import('@/views/AdCreate')
      },

      {
        path: '/admin_users/create',
        component: () => import('@/views/AdminUserCreate')
      },
      {
        path: '/admin_users/list',
        component: () => import('@/views/AdminUserList')
      },
      {
        path: '/admin_users/edit/:id',
        props: true,
        component: () => import('@/views/AdminUserCreate')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !sessionStorage.token){
    return next('/login')
  }
  next()
})

export default router