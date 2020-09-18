import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: SignUp}
    ]
})
export default router