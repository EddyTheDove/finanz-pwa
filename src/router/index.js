import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

// Pages
import Home from '../pages/home/home'
import Monthly from '../pages/monthly/monthly'
import Account from '../pages/account/account'
import Login from '../pages/auth/login'
import Register from '@/pages/auth/register'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home, beforeEnter: Guard.auth },
        { path: '/login', name: 'login', component: Login, beforeEnter: Guard.guest },
        { path: '/register', name: 'register', component: Register, beforeEnter: Guard.guest },
        { path: '/monthly', name: 'monthly', component: Monthly, beforeEnter: Guard.auth },
        { path: '/account', name: 'account', component: Account, beforeEnter: Guard.auth }
    ]
})
