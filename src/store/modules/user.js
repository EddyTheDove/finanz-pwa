import * as types from '../types'

export default {
    namespaced: true,
    state: {
        user: {}
    },

    mutations: {
        [types.SET_USER] (state, user) {
            state.user = user
        }
    }
}
