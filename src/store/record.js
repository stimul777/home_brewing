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
    },

    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ).val() || {};
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }));
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    // получить 1 запись по ID
    async fetchRecordsById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...record, id: id };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
