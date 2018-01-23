<template lang="html">
    <div class="page has-menu has-footer home-page">
        <Menu>Monthly Report</Menu>

        <div class="current-month">
            <span class="month-nav nav-left" @click="previousMonth()">
                  <i class="ion-ios-arrow-back"></i>
            </span>

            <span class="month">{{ month }}</span>
            <!-- <span class="month">December 2017</span> -->

            <span class="month-nav nav-right" @click="nextMonth()">
                  <i class="ion-ios-arrow-forward"></i>
            </span>
        </div>


        <!-- when loading  -->
        <div class="text-center" v-show="isLoading">
            <h2>Loading...</h2>
        </div>


        <!-- is not laoding  -->
        <div class="" v-show="!isLoading">
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
                            <h3>{{ total | currency }}</h3>
                            <h5>Balance</h5>
                        </div>
                    </div>

                    <div class="col-xs-3">
                        <div class="medium">
                            <h4 class="red">{{ expense | currency }}</h4>
                            <h5>Expenses</h5>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of moneys  -->

            <div class="charts">
                <div id="chart"></div>
            </div>
            <!-- End of chars  -->

            <div class="categories mt-20">
                <div class="_block shadowed pointer" v-for="c in categories">
                    <div class="_block-container">
                        <h4>
                            <div class="_dot" :style="'background-color:' + c.colour"></div>
                            {{ c.name }}
                            <span class="bold pull-right">{{ c.amount | currency }}</span>
                        </h4>
                    </div>
                </div>
            </div>
            <!-- End of categories  -->

        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import statsMixins from './mixins'
import _ from 'lodash'

export default {
    name: 'home-page',
    mixins: [statsMixins],

    data () {
        return {
            pie: {},
            income: 0,
            expense: 0,
            incomes: [],
            expenses: [],
            categories: [],
            month: '',
            isLoading: false
        }
    },

    mounted () {
        this.getMonth()
        this.getStats()
    },

    computed: {
        total () {
            return this.income - this.expense
        }
    },

    methods: {
        async getStats () {
            this.isLoading = true
            const today = window.moment(this.month, 'MMMM YYYY').format('YYYY-MM-DD')
            const response = await this.$api.get('/stats/monthly/' + today)
            this.incomes = response.data.income
            this.expenses = response.data.expenses

            this.buildIncome()
            this.buildExpensesAndCategories()
            this.isLoading = false
        },

        getMonth () {
            this.month = window.moment().format('MMMM YYYY')
        },

        previousMonth () {
            if (!this.isLoading) {
                this.month = window.moment(this.month, 'MMMM YYYY').subtract(1, 'month').format('MMMM YYYY')
                this.getStats()
            }
        },

        nextMonth () {
            if (!this.isLoading) {
                let nextMonth = window.moment(this.month, 'MMMM YYYY').add(1, 'month')
                if (window.moment().isSameOrBefore(nextMonth)) {
                    return this.$alert.info('You cannot view future dates')
                }

                this.month = nextMonth.format('MMMM YYYY')
            }
        },

        buildIncome () {
            this.income = 0
            this.incomes.forEach(i => {
                this.income += parseFloat(i.amount)
            })
        },

        buildExpensesAndCategories () {
            this.expense = 0
            this.expenses.forEach(e => {
                this.expense += parseFloat(e.amount)

                // Add category
                let cat = _.find(this.categories, { _id: e.category._id })
                if (!cat) {
                    e.category.subs = []
                    e.category.amount = parseFloat(e.amount)
                    this.categories.push(e.category)
                } else {
                    cat.amount += parseFloat(e.amount)
                }

                // Add sub category
                if (e.sub) {
                    this.categories.forEach(c => {
                        if (c._id === e.category._id) {
                            let sub = _.find(c.subs, { _id: e.sub._id })
                            if (!sub) {
                                e.sub.amount = parseFloat(e.amount)
                                c.subs.push(e.sub)
                            } else {
                                sub.amount += parseFloat(e.amount)
                            }
                        }
                    })
                }
            })

            this.buildPie()
        }
    }
}
</script>
