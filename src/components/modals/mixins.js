// eslint-disable-next-line
import tz from 'moment-timezone'

export default {
    data: () => ({
        ghost: {
            category: ''
        },
        flatpickrOptions: {
            wrap: true, // set wrap to true only when using 'input-group'
            altFormat: 'j M Y',
            altInput: true,
            dateFormat: 'Y-m-d',
            disableMobile: true,
            maxDate: 'today'
        },
        subs: []
    }),

    mounted () {
        this.resetGhost()
        this.ghost.date = window.moment().tz(window.timezone).format('YYYY-MM-DD')
        this.ghost.category = ''
        this.ghost.sub = ''
    },

    computed: {
        categories () {
            return this.$store.state.category.categories
        }
    },

    methods: {
        async save () {
            this.isLoading = true
            try {
                await this.$api.post('/entries', this.ghost)
                this.$store.dispatch('user/getUser')
                this.$store.dispatch('entry/getEntries')
                this.showMessage()
                this.resetGhost()
            } catch (error) {
                const message = error.response.data.message
                this.$alert.error(message)
            }
            this.isLoading = false
        },

        resetGhost () {
            this.ghost.amount = ''
            this.ghost.description = ''
        }
    }
}
