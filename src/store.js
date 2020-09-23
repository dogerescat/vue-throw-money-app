import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      wallet: 0,
    },
  },
  mutations: {
    getUserInfo(state, user) {
      state.user.name = user.name;
      state.user.wallet = user.wallet;
    },
  },
  actions: {
    signUp({ commit }, authData) {
      const firstUserData = {
        name: authData.username,
        wallet: 0
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
          firebase
            .firestore()
            .collection('users')
            .doc(res.user.uid)
            .set(firstUserData)
            .then(() => {
              commit('getUserInfo',firstUserData);
            })
            .catch((error) => {
              console.log(error.message)
            })
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    signIn({ dispatch }, authData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
          dispatch('getUserInfo', res.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getUserInfo({ commit }, user) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((res) => {
          commit('getUserInfo', res.data());
        });
    },
  },
});

export default store;
