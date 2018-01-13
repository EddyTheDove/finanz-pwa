import AuthService from '@/services/auth'

export default {
    data: () => ({
        ghost: {},
        isLoading: false,
        errorMessage: ''
    }),

    methods: {
        goto (name) {
            this.$router.push({ name })
        },

        async authenticate (link) {
            this.isLoading = true
            this.errorMessage = ''
            const url = '/auth/' + link

            try {
                const response = await this.$api.post(url, this.ghost)
                this.saveUser(response.data)
            } catch (error) {
                console.log('Error', error.response.data)
                this.errorMessage = error.response.data.message
            }

            this.isLoading = false
        },

        saveUser (user) {
            this.$store.commit('user/SET_USER', user)
            AuthService.setToken(user.token)
            this.$api.setHeaders(user.token)
            this.$router.push('/')
        }
    }
}
