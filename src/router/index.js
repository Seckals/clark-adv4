import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const routes = [{
   path: '/',
   name: 'Layout',
   component: Layout,
   redirect: '/mg-classes',
   children: [{
      path: "/mg-bol",
      name: 'mgbol',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/otherPage/BOL.vue'),
      meta: {
         title: 'BOL数据维护'
      }
   }, {
      path: "/mg-hc",
      name: 'mghc',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/otherPage/HC.vue'),
      meta: {
         title: '人头数据维护'
      }
   }, {
      path: "/project-item",
      name: 'projectitem',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/otherPage/project.vue'),
      meta: {
         title: '项目成品天窗物料对应表'
      }
   }, {
      path: "/reason-code",
      name: 'reasoncode',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/otherPage/dept.vue'),
      meta: {
         title: '部门原因代码对应表'
      }
   }, {
      path: "/problem-type",
      name: 'problemtype',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/problemtype'),
      meta: {
         title: '问题类型'
      }
   },
   {
      path: '/problem-level',
      name: 'problemlevel',
      component: () => import( /* webpackChunkName: "warning-email" */ '../views/problemlevel'),
      meta: {
         title: '问题等级'
      }
   }, {
      path: '/mg-position',
      name: 'position',
      component: () => import( /* webpackChunkName: "mg-position" */ '../views/position'),
      meta: {
         title: '职位管理'
      }
   },
   {
      path: '/warning-email',
      name: 'warningemail',
      component: () => import( /* webpackChunkName: "warning-email" */ '../views/warningemail'),
      meta: {
         title: '维护警告通知'
      }
   },
   {
      path: '/mg-produce-line',
      name: 'produceline',
      component: () => import( /* webpackChunkName: "mg-produce-line" */ '../views/produceline'),
      meta: {
         title: '维护产线'
      }
   },
   {
      path: '/mg-classes',
      name: 'classes',
      component: () => import( /* webpackChunkName: "mg-classes" */ '../views/classes'),
      meta: {
         title: '维护班次'
      }
   }, {
      path: '/shutdown',
      name: 'classes',
      component: () => import( /* webpackChunkName: "mg-classes" */ '../views/shutdown'),
      meta: {
         title: '停机代码'
      }
   },
   {
      path: '/mg-projects',
      name: 'projects',
      component: () => import( /* webpackChunkName: "mg-projects" */ '../views/projects'),
      meta: {
         title: '维护项目'
      }
   },
   {
      path: '/mg-customers',
      name: 'customers',
      component: () => import( /* webpackChunkName: "mg-customers" */ '../views/customers'),
      meta: {
         title: '维护客户'
      }
   },
   {
      path: '/mg-employees',
      name: 'employees',
      component: () => import( /* webpackChunkName: "mg-employees" */ '../views/employees'),
      meta: {
         title: '维护员工'
      }
   },
   {
      path: '/mg-departments',
      name: 'departments',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/departments'),
      meta: {
         title: '维护部门'
      }
   },
   {
      path: '/mg-station',
      name: 'station',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/stations'),
      meta: {
         title: '维护工位'
      }
   },
   {
      path: '/mg-line-station',
      name: 'mylinestation',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/mylinestation'),
      meta: {
         title: '按产线列出工位'
      }
   },
   {
      path: '/mg-line-project',
      name: 'mylineproject',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/mylineproject'),
      meta: {
         title: '按产线列出项目'
      }
   },
   {
      path: '/mg-teams',
      name: 'teams',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/teams'),
      meta: {
         title: '维护团队'
      }
   },
   {
      path: '/mg-teams-employees',
      name: 'teamsemployees',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/teamsemployees'),
      meta: {
         title: '按团队列出员工'
      }
   },
   {
      path: '/calendar',
      name: 'calendar',
      component: () => import( /* webpackChunkName: "mg-departments" */ '../views/calendar'),
      meta: {
         title: '日历管理'
      }
   }
   ]
}, {
   path: '/401',
   name: '401',
   component: () => import( /* webpackChunkName: "404" */ '../views/401')
}, {
   path: '*',
   name: '404',
   component: () => import( /* webpackChunkName: "404" */ '../views/404')
}]

const router = new VueRouter({
   mode: 'hash',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   // document.title = to.meta.title || '主数据'
   next()
})

export default router