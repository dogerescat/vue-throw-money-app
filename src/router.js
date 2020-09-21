import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: SignUp},
        { path: '/signin', component: SignIn}
    ]
})
export default router