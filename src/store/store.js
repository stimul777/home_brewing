import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

Vue.use(Vuex);
export default new Vuex.Store({
  actions: {
    async fetchCurrency() {
      const keyFixer = process.env.VUE_APP_FIXER_API;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${keyFixer}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    }
  },

  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },

    clearError(state) {
      state.error = null;
    }
  },

  getters: {
    error: s => s.error
  },

  modules: {
    auth,
    info,
    category,
    record
  }
});
