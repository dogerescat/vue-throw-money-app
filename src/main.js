import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAPWsuEU34GEi_1Z52ZEYDYg5GK6MktG6s",
  authDomain: "vue-throw-money-app.firebaseapp.com",
  databaseURL: "https://vue-throw-money-app.firebaseio.com",
  projectId: "vue-throw-money-app",
  storageBucket: "vue-throw-money-app.appspot.com",
  messagingSenderId: "209485978398",
  appId: "1:209485978398:web:c82c6e50c8a0a8e4f7870f",
  measurementId: "G-CC6LB4GMG2"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  store,  
  router,
  render: h => h(App),
}).$mount('#app')
