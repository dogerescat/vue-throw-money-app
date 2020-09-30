import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      wallet: 0,
      auth: false,
      uid: '',
    },
    otherUsers: [],
  },
  mutations: {
    getUserInfo(state, user) {
      state.user.name = user.name;
      state.user.wallet = user.wallet;
      state.user.uid = user.uid;
    },
    switchAuth(state, result) {
      if (!result) {
        state.user.auth = false;
      } else {
        state.user.auth = true;
      }
    },
    deleteUserInfo(state) {
      state.user.name = '';
      state.user.wallet = 0;
      state.user.uid = '';
    },
    getOtherUsersInfo(state, otherUser) {
      state.otherUsers.push(otherUser);
    },
    deleteOtherUsersInfo(state) {
      state.otherUsers = [];
    },
    updateOtherUserWallet(state, payload) {
      state.otherUsers[payload.index].wallet = payload.money;
    },
    updateUserWallet(state, payload) {
      state.user.wallet = payload.money;
    },
  },
  actions: {
    signUp({ commit }, authData) {
      const firstUserData = {
        name: authData.username,
        wallet: 500,
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
          firstUserData.uid = res.user.uid;
          firebase
            .firestore()
            .collection('users')
            .doc(res.user.uid)
            .set(firstUserData)
            .then(() => {
              commit('getUserInfo', firstUserData);
              router.push('/dashboard').catch((error) => {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
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
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('deleteUserInfo');
          commit('deleteOtherUsersInfo');
          router.push('/signin').catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
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
          router.push('/dashboard').catch((error) => {
            console.log(error);
          });
        });
    },
    getOtherUsersInfo({ commit }, user) {
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id !== user.uid) {
              commit('getOtherUsersInfo', doc.data());
            }
          });
        });
    },
    updateOtherUserWallet({ commit }, payload) {
      firebase
        .firestore()
        .collection('users')
        .doc(payload.uid)
        .update({
          wallet: payload.money,
        })
        .then(() => {
          commit('updateOtherUserWallet', payload);
        });
    },
    updateUserWallet({ commit }, payload) {
      firebase
        .firestore()
        .collection('users')
        .doc(payload.uid)
        .update({
          wallet: payload.money,
        })
        .then(() => {
          commit('updateUserWallet', payload);
        });
    },
  },
});
export default store;
