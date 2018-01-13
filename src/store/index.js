import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import sidebarModule from './modules/sidebar'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,

    modules: {
        user: userModule,
        sidebar: sidebarModule
    }
})
