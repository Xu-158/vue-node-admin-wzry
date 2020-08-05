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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router