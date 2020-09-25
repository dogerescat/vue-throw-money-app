import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SignUp,
    },
    {
      path: '/signin',
      component: SignIn,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.state.user.auth) {
          next();
        } else {
          next('/signin');
        }
      },
    },
  ],
});

export default router;
