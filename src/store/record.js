import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      const uid = await dispatch("getUid");
      try {
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
