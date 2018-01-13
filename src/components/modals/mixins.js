export default {
    data: () => ({
        isOpen: false,
        ghost: {
            date: window.moment().format('YYYY-MM-DD'),
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
        categories: [],
        subs: []
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
