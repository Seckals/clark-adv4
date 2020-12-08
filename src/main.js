import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import util from './utils'
import './plugins/ant-design-vue.js'
import './directives'
import './assets/css/index.less'
import './components'

Vue.config.productionTip = false
Vue.prototype.$utils = util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
