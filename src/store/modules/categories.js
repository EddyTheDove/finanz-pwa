import * as types from '../types'
import ApiService from '../../services/api'

export default {
    namespaced: true,
    state: {
        categories: []
    },

    mutations: {
        [types.SET_CATEGORIES] (state, categories) {
            state.categories = categories
        }
    },

    actions: {
        async getCategories ({ commit }) {
            try {
                const response = await ApiService.get('/categories')
                commit('SET_CATEGORIES', response.data)
            } catch (error) {
                console.log('Error', error)
            }
        }
    }
}
