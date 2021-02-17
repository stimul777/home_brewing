import Vue from 'vue'
import 'materialize-css/dist/js/materialize.min'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

