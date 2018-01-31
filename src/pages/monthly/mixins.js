import Vue from 'vue'
import VueC3 from 'vue-c3'

export default {
    data: () => ({
        handler: new Vue(), // eslint-disable-line
        init: false
    }),

    components: { VueC3 },

    methods: {
        destroyPie () {
            console.log('Destroying')
            if (this.init) {
                this.init = false
                this.handler.$emit('destroy')
            }
        },

        buildPie () {
            let colours = {}
            let columns = []

            this.categories.forEach(c => {
                colours[c.name] = c.colour
                columns.push([c.name, c.amount])
            })

            const options = {
                data: {
                    columns: columns,
                    colors: colours,
                    type: 'donut'
                },

                donut: {
                    title: 'Expenses'
                }
            }

            this.handler.$emit('init', options)
            this.init = true
        }
    }
}
