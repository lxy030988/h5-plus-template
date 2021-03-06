import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/default/index.vue'
import FullLayout from '@/layouts/full/index.vue'
// import { getToken } from '@/utils/storage/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'DefaultLayout',
    redirect: 'home',
    component: DefaultLayout,
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'My',
        path: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/PersonalData/index.vue'),
        meta: {
          title: '我的'
        }
      }
      // {
      //   path: 'setting/plan',
      //   name: 'SettingPlan',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "plan" */ '../views/Plan/index.vue'),
      //   meta: {
      //     title: '计划页面'
      //   }
      // }
    ]
  },
  {
    path: '/',
    name: 'FullLayout',
    component: FullLayout,
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
        meta: {
          title: '登录',
          ignore: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to)
  next()
  document.title = to.meta.title as string
  // if (to.meta.ignore || getToken()) {
  //   next()
  // } else {
  //   next({ path: '/login' })
  // }
})

export default router
