import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
      userId: null
  },
  mutations: {
      updateUserId(state, userId){
          state.userId = userId
      }
  },
  actions: {
    signUp( {commit}, authData ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
          commit('updateUserId', res.user.uid)
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    signIn( { commit }, authData ) {
      firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then((res) => {
          commit('updateUserId', res.user.uid)
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  },
});

export default store;
