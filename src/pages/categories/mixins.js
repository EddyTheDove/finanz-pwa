import _ from 'lodash'

export default {
    data: () => ({
        showColours: true,
        category: {},
        colour: '#1abc9c',
        subcategories: [],
        isLoading: false,
        colours: ['#1abc9c', '#16a085', '#2ecc71', '#27ae60', '#3498db', '#2980b9',
            '#0088cc', '#f122d6', '#be22f1', '#9b59b6', '#8e44ad', '#34495e',
            '#2c3e50', '#000000', '#f1c40f', '#f39c12', '#ff8800', '#d35400',
            '#e74c3c', '#ff0000', '#c0392b', '#bdc3c7', '#95a5a6', '#7f8c8d'
        ],
        availableColours: []
    }),

    computed: {
        categories () {
            return this.$store.state.category.categories
        }
    },

    watch: {
        categories () {
            this.filterColours()
        }
    },

    methods: {
        pushSub (sub) {
            this.subcategories.push(sub)
            this.pushSubToStore(sub)
        },

        pushSubToStore (sub) {
            this.$store.dispatch('category/pushSub', sub)
        },

        removeSub (s) {
            this.subcategories = this.subcategories.filter(item => {
                return item !== s
            })
        },
        selectColour (c) {
            this.colour = c
        },

        filterColours () {
            let takenColours = []
            this.availableColours = []

            // get colours from existing categories
            this.categories.forEach(c => {
                takenColours.push(c.colour)
            })

            // remove used colours
            this.colours.forEach(c => {
                if (!takenColours.includes(c)) {
                    this.availableColours.push(c)
                }
            })

            // set initial colour
            if (!_.isEmpty(this.editing)) {
                this.colour = this.editing.colour
            } else {
                this.colour = this.availableColours[0]
            }
        }
    }
}
