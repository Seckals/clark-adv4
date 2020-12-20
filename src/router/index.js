import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import user from '../views/user'
import login from '../views/user/login'
import register from '../views/user/register'
import registerresult from '../views/user/register-result'
import registeractive from '../views/user/register-active'
import resetpwdsendmail from '../views/user/resetpwd-sendmail'
import resetpwd from '../views/user/resetpwd'
import store from '../store'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/mg-role',
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
      },
      {
        path: '/mg-role-users',
        name: 'mgroleusers',
        component: () => import( /* webpackChunkName: "mg-position" */ '../views/mgroleusers'),
        meta: {
          title: '按角色维护用户'
        }
      },
      {
        path: '/mg-role-authorize',
        name: 'mgroleauthorize',
        component: () => import( /* webpackChunkName: "mg-position" */ '../views/mgroleauthorize'),
        meta: {
          title: '按角色维护功能和权限'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    redirect: '/user/login',
    children: [{
        path: 'login',
        component: login,
        name: 'login',
        meta: {
          title: '登录'
        },
      },
      {
        path: 'regist',
        component: register,
        name: 'regist',
        meta: {
          title: '注册'
        },
      },
      {
        path: 'register-result',
        component: registerresult,
        name: 'register-result',
        meta: {
          title: '注册-规则'
        },
      },
      {
        path: 'register-active',
        component: registeractive,
        name: 'register-active',
        meta: {
          title: '注册-激活'
        },

      },
      {
        path: 'resetpwd-sendmail',
        component: resetpwdsendmail,
        name: 'resetpwd-sendmail',
        meta: {
          title: '重置密码-发送邮箱'
        },
      },

      {
        path: 'resetpwd',
        component: resetpwd,
        name: 'resetpwd',
        meta: {
          title: '重置密码'
        },
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '../views/404')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to, from, )
  const detail = localStorage.getItem('auth-info')
  if (to.path == "/user/login" || to.path == "/user/regist") {
    next()
  } else {
    if (detail) {
      store.commit('SET_DETAIL')
      next()
    } else {
      next('/user/login')
    }
  }
})

export default router