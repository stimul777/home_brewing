import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import dateFilter from '@/filters/date.filter'
import Vuelidate from 'vuelidate'
import 'materialize-css/dist/js/materialize.min'
import store from './store/store'
// firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)

// firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyCTUWf8fYCzrY9_Ee-Ttx3XBURTCLJ4ToM",
  authDomain: "crm-system-vue-4283f.firebaseapp.com",
  projectId: "crm-system-vue-4283f",
  storageBucket: "crm-system-vue-4283f.appspot.com",
  messagingSenderId: "889254025046",
  appId: "1:889254025046:web:505c4dc77f2a62a1dd68f7"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})

