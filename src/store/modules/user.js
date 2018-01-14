import * as types from '../types'
import ApiService from '../../services/api'

export default {
    namespaced: true,
    state: {
        user: {}
    },

    mutations: {
        [types.SET_USER] (state, user) {
            state.user = user
        }
    },

    actions: {
        async getUser ({ commit }) {
            try {
                const response = await ApiService.get('/auth')
                commit('SET_USER', response.data)
            } catch (error) {
                console.log('Error', error)
            }
        }
    }
}
