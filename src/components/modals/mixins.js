// eslint-disable-next-line
import tz from 'moment-timezone'

export default {
    data: () => ({
        ghost: {
            date: window.moment().tz(window.timezone).format('YYYY-MM-DD'),
            category: '',
            sub: ''
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
            } catch (error) {
                const message = error.response.data.message
                this.$alert.error(message)
            }
            this.isLoading = false
        }
    }
}
