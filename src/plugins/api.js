import axios from 'axios'
import env from '../../env'
import auth from '../services/auth'

axios.defaults.baseURL = env.BASEURL
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(env.TOKEN)

// Intercept all 401
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        auth.logout()
    }
    return Promise.reject(error)
})

export default {
    install: function (Vue) {
        Vue.prototype.$api = {
            get (url) {
                return axios.get(url)
            },

            post (url, data) {
                return axios.post(url, data)
            },

            update (url, data) {
                return axios.put(url, data)
            },

            delete (url) {
                return axios.delete(url)
            },

            setHeaders (token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            },

            clearToken () {
                axios.defaults.headers.common['Authorization'] = ''
            }
        }
    }
}
