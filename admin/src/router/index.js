import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    children:[
      {
        path:'/categories/create',
        component:()=>import('@/views/CategoryCreate')
      },
      {
        path:'/categories/list',
        component:()=>import('@/views/CategoryList')
      },
      {
        path:'/categories/edit/:id',
        props:true,
        component:()=>import('@/views/CategoryCreate')
      },

      {
        path:'/items/create',
        component:()=>import('@/views/ItemCreate')
      },
      {
        path:'/items/list',
        component:()=>import('@/views/ItemList')
      },
      {
        path:'/items/edit/:id',
        props:true,
        component:()=>import('@/views/ItemCreate')
      },

      {
        path:'/heroes/create',
        component:()=>import('@/views/HeroCreate')
      },
      {
        path:'/heroes/list',
        component:()=>import('@/views/HeroList')
      },
      {
        path:'/heroes/edit/:id',
        props:true,
        component:()=>import('@/views/HeroCreate')
      },

      {
        path:'/articles/create',
        component:()=>import('@/views/ArticleCreate')
      },
      {
        path:'/articles/list',
        component:()=>import('@/views/ArticleList')
      },
      {
        path:'/articles/edit/:id',
        props:true,
        component:()=>import('@/views/ArticleCreate')
      },

      {
        path:'/ads/create',
        component:()=>import('@/views/AdCreate')
      },
      {
        path:'/ads/list',
        component:()=>import('@/views/AdList')
      },
      {
        path:'/ads/edit/:id',
        props:true,
        component:()=>import('@/views/AdCreate')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router