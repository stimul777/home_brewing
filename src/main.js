import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import dateFilter from '@/filters/date.filter'
import Vuelidate from 'vuelidate'
import 'materialize-css/dist/js/materialize.min'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

