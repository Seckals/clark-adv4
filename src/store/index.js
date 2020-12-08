import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',
    token:'',
    menu:[],
    permission:[]
  },
  getters:{
    getUser(state){
      return state.user
    },
    getToken(state){
      return state.token
    },
    getMenu(state){
      return state.menu
    },
    getPermission(state){
      if(!state.permission || state.permission.length === 0){
        const detail = util.getLocal('auth-info') || {}
        const menu = util.getOneFromList(detail.modules,'name','mainData') || []
        state.permission =  util.getOneValueInOneArray(menu.categories||[],'name') || []  
      }
      return state.permission
    }
  },
  mutations: {
    SET_DETAIL(state){
      const detail = util.getLocal('auth-info') || {}
      const menu = util.getOneFromList(detail.modules,'name','mainData') || []
      const permission = util.getOneValueInOneArray(menu.categories||[],'name') || []
      
      state.user = detail.empName
      state.token = detail.token
      state.menu = menu.categories || []
      state.permession = permission
    }
  }
})

