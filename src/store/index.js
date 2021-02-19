import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils'
// import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '张三',
    token: '',
    menu: [],
    menu1: [],
    permission: [],
    collapsed: false
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || ''
    },
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    },
    getMenu(state) {
      return state.menu
    },
    getMenu1(state) {
      return state.menu1
    },
    getPermission(state) {
      if (!state.permission || state.permission.length === 0) {
        const detail = util.getLocal('auth-info') || {}
        const menu = util.getOneFromList(detail.modules, 'name', 'permission') || []
        state.permission = util.getOneValueInOneArray(menu.categories || [], 'name') || []
      }
      return state.permission
    }
  },
  mutations: {
    collapsed(state, playod) {
      state.collapsed = playod
    },
    SET_TOKEN: () => {
      // state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_DETAIL(state) {
      const detail = util.getLocal('auth-info') || {}
      const menu = util.getOneFromList(detail.modules, 'name', 'permission') || {}
      const permission = util.getOneValueInOneArray(menu.categories || [], 'name') || []
      console.log(permission,detail);
      state.user = detail.empName
      state.token = detail
      state.menu = menu.categories.filter((i) => {
        return i.type == 1
      })
      state.menu1 = menu.categories.filter((i) => {
        return i.type == 3
      })
      state.permession = permission
    }
  },
  actions: {
    Logout({
      commit,
    }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        // await userLogout()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
})