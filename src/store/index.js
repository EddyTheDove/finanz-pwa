import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import sidebarModule from './modules/sidebar'
import categoryModule from './modules/categories'
import entryModule from './modules/entries'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,

    modules: {
        user: userModule,
        entry: entryModule,
        sidebar: sidebarModule,
        category: categoryModule
    }
})
