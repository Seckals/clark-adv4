import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils'

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
        const menu = util.getOneFromList(detail.modules, 'name', 'mainData') || []
        state.permission = util.getOneValueInOneArray(menu.categories || [], 'name') || []
      }
      return state.permission
    }
  },
  mutations: {
    collapsed(state, playlod) {
      state.collapsed = playlod
    },
    SET_DETAIL(state) {
      const detail = util.getLocal('auth-info') || {}
      const menu = util.getOneFromList(detail.modules, 'name', 'mainData') || {}
      const permission = util.getOneValueInOneArray(menu.categories || [], 'name') || []
      console.log(detail)
      state.user = detail.empName
      state.token = detail.token
      state.menu = menu.categories.filter((i) => {
        return i.type == 1
      })
      state.menu1 = menu.categories.filter((i) => {
        return i.type == 3
      })
      state.permession = permission
    }
  }
})