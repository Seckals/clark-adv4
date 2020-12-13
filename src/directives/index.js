import Vue from 'vue'
import Util from '../utils'


Vue.directive('permission', {
  bind(el, binding) {
    console.log(binding)
    if (!Util.hasPermission(binding.value)) {
      Vue.nextTick(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
})