/*
 * @Author: 张鹏
 * @Date: 2021-03-11 19:19:52
 * @LastEditTime: 2021-03-11 19:20:34
 * @LastEditors: your name
 * @Description: 
 * @FilePath: /clark-adv4/src/main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
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