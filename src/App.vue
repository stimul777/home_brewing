<template>
  <div id='app'>
    <component :is='layout'></component>
    <!-- <div id='nav'>
      <router-link to='/'>Home</router-link>|
      <router-link to='/about'>About</router-link>
    </div>-->
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'

export default {
  components: {
    EmptyLayout,
    MainLayout,
  },

  computed: {
    layout() {
      // console.log('!!!', this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
}
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
</style>
