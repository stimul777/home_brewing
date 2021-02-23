import firebase from 'firebase/app'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    }
  },

  async register({ dispatch }, { email, password, name }) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const uuid = dispatch('getUid')
      // запись в базу данных
      await firebase.database().ref(`/users/${uid}/info`).set({
        bill: 100000,
        name: name
      })
    } catch (error) {
      throw error
    }
  },

  // Получить айди пользователя из базы
  getUid() {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
  },

  async logout() {
    await firebase.auth().signOut()
  }
}