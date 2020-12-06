import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils'

Vue.use(Vuex)

const detail = util.getLocal('auth-info') || {}
const menu = util.getOneFromList(detail.modules,'name','mainData') || []
const permission = util.getOneValueInOneArray(menu.categories||[],'name') || []

export default new Vuex.Store({
  state: {
    user:'',
    token:'',
    menu:[],
    permission:[]
  },
  getters:{
    getUser(state){
      if(!state.user){
        state.user = detail.empName || ''
      }
      return state.user
    },
    getToken(state){
      if(!state.token){
        state.token = detail.token || ''
      }
      return state.token
    },
    getMenu(state){
      if(!state.menu || state.menu.length === 0){
        state.menu = menu.categories || []
      }
      return state.menu
    },
    getPermission(state){
      if(!state.permission || state.permission.length === 0){
        state.permission = permission
      }
      return state.permission
    }
  },
  mutations: {
    SET_DETAIL(state){
      state.user = detail.empName
      state.token = detail.token
      state.menu = menu.categories || []
      state.permession = permission
    }
  }
})
