export default {
    data: () => ({
        isOpen: false,
        isLoading: false,
        ghost: {}
    }),

    methods: {
        open () {
            this.isOpen = true
        },

        close () {
            this.isOpen = false
        }
    }
}
