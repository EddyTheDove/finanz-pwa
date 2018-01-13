import authenticator from './auth'

export default {
    guest (to, from, next) {
        next(!authenticator.check())
    },

    auth (to, from, next) {
        next(authenticator.check() ? true : { path: '/login' })
    }
}
