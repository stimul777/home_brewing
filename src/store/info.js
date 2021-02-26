import firebase from "firebase/app";

export default {
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        //  получаем из базы поле info
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("setInfo", info);
      } catch (error) {
        commit("SetError", error);
        throw error;
      }
    },
    // Обновление баланса из категории
    async updateInfo({ dispatch, commit }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(toUpdate);
        commit("setInfo", updateData);
      } catch (error) {
        commit("SetError", error);
        throw error;
      }
    }
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },

    // cброс для того, чтобы не кешировалось и сессии пользователя не пересекались
    clearInfo(state) {
      state.info = {};
    }
  },

  state: {
    info: {}
  },

  getters: {
    info: s => s.info
  }
};
