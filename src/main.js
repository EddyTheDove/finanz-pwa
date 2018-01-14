// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueFlatpickr from 'vue-flatpickr-component'
import VeeValidate from 'vee-validate'

// Global components
import Menu from './components/menu/menu'
import Footer from './components/footer/footer'
import Sidebar from './components/sidebar/sidebar'
import IncomeModal from './components/modals/income'
import expenseModal from './components/modals/expense'

// Plugins
import api from './plugins/api'
import helpr from './plugins/helpr'
import alert from './plugins/alert'

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')

// import filters globally
require('./filters')

Vue.use(VeeValidate)
Vue.use(alert)
Vue.use(helpr)
Vue.use(api)

Vue.component('Menu', Menu)
Vue.component('Footer', Footer)
Vue.component('Sidebar', Sidebar)
Vue.component('IncomeModal', IncomeModal)
Vue.component('expenseModal', expenseModal)
Vue.component('flat-pickr', VueFlatpickr)

// Event manager
window.eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
