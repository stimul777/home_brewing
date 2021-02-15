import VueRouter from 'vue-router'
Vue.use(VueRouter)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      patch: '/',
      name: 'home',
      component: Home
    },
    {
      patch: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      patch: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')
    },
  ]

})
