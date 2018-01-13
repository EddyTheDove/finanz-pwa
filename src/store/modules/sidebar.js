import * as types from '../types'

export default {
    namespaced: true,
    state: {
        isOpen: false
    },

    mutations: {
        [types.SIDEBAR_OPEN] (state) {
            state.isOpen = true
        },
        [types.SIDEBAR_CLOSE] (state) {
            state.isOpen = false
        },
        [types.SIDEBAR_TOGGLE] (state) {
            state.isOpen = !state.isOpen
        }
    }
}
