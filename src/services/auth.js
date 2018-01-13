import env from '../../env'

export default {
    user () {
        return this.$store.state.user.user
    },

    getToken () {
        return localStorage.getItem(env.TOKEN)
    },

    setToken (token) {
        localStorage.setItem(env.TOKEN, token)
    },

    logout () {
        localStorage.removeItem(env.TOKEN)
        location.reload()
    },

    check () {
        return localStorage.getItem(env.TOKEN)
    }
}
