<template lang="html">
    <div class="page has-menu has-footer home-page">
        <Menu>Monthly Report</Menu>

        <div class="current-month">
            <span class="month-nav nav-left">
                  <i class="ion-ios-arrow-back"></i>
            </span>

            <span class="month">November 2017</span>
            <!-- <span class="month">December 2017</span> -->

            <span class="month-nav nav-right">
                  <i class="ion-ios-arrow-forward"></i>
            </span>
        </div>



        <div class="moneys">
            <div class="row">
                <div class="col-xs-3">
                    <div class="medium">
                        <h4 class="green">{{ income | currency }}</h4>
                        <h5>Income</h5>
                    </div>
                </div>

                <div class="col-xs-6">
                    <div class="large">
                        <h3>{{ totalExpenses | currency }}</h3>
                        <h5>Balance</h5>
                    </div>
                </div>

                <div class="col-xs-3">
                    <div class="medium">
                        <h4 class="red">{{ total | currency }}</h4>
                        <h5>Expenses</h5>
                    </div>
                </div>
            </div>
        </div>


        <div class="charts">
            <div id="chart"></div>
        </div>


        <div class="categories mt-20">
            <div class="_block shadowed pointer" v-for="c in categories">
                <div class="_block-container">
                    <h4>
                        <div class="_dot" :style="'background-color:' + c.color"></div>
                        {{ c.name }}
                        <span class="bold pull-right">{{ c.amount | currency }}</span>
                    </h4>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import c3 from 'c3'

export default {
    name: 'home-page',
    data () {
        return {
            pie: {},
            income: 3000,
            categories: [
                { name: 'Car', amount: 450.00, color: '#f00' },
                { name: 'Bills', amount: 500.87, color: '#f80' },
                { name: 'Medical', amount: 60.99, color: '#08c' },
                { name: 'House', amount: 220.00, color: '#666' },
                { name: 'Miscellaneous', amount: 70.00, color: '#999' }
            ]
        }
    },

    mounted () {
        this.buildPie()
    },

    computed: {
        totalExpenses () {
            return this.categories.reduce((a, b) => {
                return a + b.amount
            }, 0)
        },

        total () {
            return this.income - this.totalExpenses
        }
    },

    methods: {
        buildPie () {
            let colours = {}
            let columns = []

            this.categories.forEach(c => {
                colours[c.name] = c.color
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
                    title: 'Expenses breakdown'
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
</script>
