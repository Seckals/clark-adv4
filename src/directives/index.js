import Vue from 'vue'
import Util from '../utils'


Vue.directive('permission', {
  bind(el, binding) {
    if (!Util.hasPermission(binding.value)) {
      Vue.nextTick(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
})