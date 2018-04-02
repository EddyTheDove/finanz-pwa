import _ from 'lodash'
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
        },

        async addCategory ({ dispatch }, payload) {
            try {
                await ApiService.post('/categories', payload)
                dispatch('getCategories')
            } catch (error) {
                console.log('Error', error)
            }
        },

        updateCategory ({ commit, state }, payload) {
            let categories = state.categories.slice()

            for (let c in categories) {
                if (categories[c]._id === payload._id) {
                    categories[c] = payload
                }
            }

            commit('SET_CATEGORIES', categories)
        },

        pushSub ({ commit, state }, payload) {
            let categories = _.cloneDeep(state.categories)

            for (let c in categories) {
                if (categories[c]._id === payload.category) {
                    categories[c].subs.push(payload)
                }
            }

            commit('SET_CATEGORIES', categories)
        }
    }
}
