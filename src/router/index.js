import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import user from '../views/user'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'user',
    component: user,
    redirect: 'login',
    children: [{
        path: 'login',
        component: () => import('../views/user/login'),
        name: 'login',
        meta: {
          title: '登录'
        },
      },
      {
        path: 'regist',
        component: () => import('../views/user/register'),
        name: 'regist',
        meta: {
          title: '注册'
        },
      },
      {
        path: 'register-result',
        component: () => import('../views/user/register-result'),
        name: 'register-result',
        meta: {
          title: '注册-规则'
        },
      },
      {
        path: 'register-active',
        component: () => import('../views/user/register-active'),
        name: 'register-active',
        meta: {
          title: '注册-激活'
        },

      },
      {
        path: 'resetpwd-sendmail',
        component: () => import('../views/user/resetpwd-sendmail'),
        name: 'resetpwd-sendmail',
        meta: {
          title: '重置密码-发送邮箱'
        },
      },

      {
        path: 'resetpwd',
        component: () => import('../views/user/resetpwd'),
        name: 'resetpwd',
        meta: {
          title: '重置密码'
        },
      },
    ]
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
    children: [{
      path: '/mg-users',
      name: 'mgusers',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/mgusers'),
      meta: {
        title: '维护用户'
      }
    }, {
      path: '/mg-role',
      name: 'mgrole',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/mgrole'),
      meta: {
        title: '维护角色'
      }
    }]
  },
  {
    path: '/404',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '../views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router