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
        },

        async remove ({ commit, state }, entry) {
            try {
                const entries = state.entries.filter(e => e._id !== entry._id)
                commit(types.SET_ENTRIES, entries)
                ApiService.delete('/entries/' + entry._id)
            } catch (e) {
                console.log('Error in entry module dispatch', e)
            }
        }
    }
}
