import * as types from '../types'
import ApiService from '../../services/api'

export default {
    namespaced: true,
    state: {
        user: {},
        balance: {}
    },

    mutations: {
        [types.SET_USER] (state, user) {
            state.user = user
        },
        [types.SET_BALANCE] (state, balance) {
            state.balance = balance
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
        },

        async getBalance (context) {
            try {
                const response = await ApiService.get('/users/balance')
                context.commit(types.SET_BALANCE, response.data)
            } catch (error) {
                console.log('Error', error)
            }
        }
    }
}
