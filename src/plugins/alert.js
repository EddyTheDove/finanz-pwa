
export default {
    install: function (Vue) {
        Vue.prototype.$alert = {
            success (message) {
                window.eventBus.$emit('alert:show', { type: 'success', message })
            },

            info (message) {
                window.eventBus.$emit('alert:show', { type: 'info', message })
            },

            error (message) {
                window.eventBus.$emit('alert:show', { type: 'error', message })
            }
        }
    }
}
