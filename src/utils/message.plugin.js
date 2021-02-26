export default {
  // Материалайз - передача сообщений 
  install(Vue, options) {
    Vue.prototype.$snackMessage = function(html) {
      M.toast({html})
    },

    Vue.prototype.$error = function(html) {
      M.toast({html: `[Ошибка: ${html}]`})
    }
  }
}
