import * as types from '../types'
import ApiService from '../../services/api'

export default {
    namespaced: true,
    state: {
        entries: [],
        nextPage: null
    },

    mutations: {
        [types.SET_ENTRIES] (state, entries) {
            state.entries = entries
        },
        [types.SET_NEXT_PAGE] (state, nextPage) {
            state.nextPage = nextPage
        }
    },

    actions: {
        async getEntries ({ commit }) {
            try {
                const response = await ApiService.get('/entries')
                commit('SET_ENTRIES', response.data.data)
                commit('SET_NEXT_PAGE', response.data.next_page)
            } catch (error) {
                console.log('Error', error)
            }
        }
    }
}
