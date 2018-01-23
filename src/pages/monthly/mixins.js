
import c3 from 'c3'

export default {
    methods: {
        buildPie () {
            let colours = {}
            let columns = []

            this.categories.forEach(c => {
                colours[c.name] = c.colour
                columns.push([c.name, c.amount])
            })

            this.pie = c3.generate({
                bindto: '#chart',
                data: {
                    columns: columns,
                    colors: colours,
                    type: 'donut',
                    onclick: function (d, i) { console.log('onclick', d, i) },
                    onmouseover: function (d, i) { console.log('onmouseover', d, i) },
                    onmouseout: function (d, i) { console.log('onmouseout', d, i) }
                },

                donut: {
                    title: 'Expenses'
                    // label: {
                    //     format: function (value, ratio, id) {
                    //         return d3.format('$')(value);
                    //     }
                    // }
                }
            })
        }
    }
}
