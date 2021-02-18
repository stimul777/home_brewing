import Vue from 'vue'
import 'materialize-css/dist/js/materialize.min'
import App from './App.vue'
import router from './router/router'
import dateFilter from '@/filters/date.filter'

Vue.config.productionTip = false
Vue.filter('dateFilter', dateFilter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

