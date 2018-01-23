import * as types from '../types'
import ApiService from '../../services/api'

export default {
    namespaced: true,
    state: {
        data: {}
    },

    mutations: {
        [types.SET_DATA] (state, payload) {
            state.data = payload
        }
    }
}
