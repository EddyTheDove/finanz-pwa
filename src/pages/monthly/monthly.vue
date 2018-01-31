<template lang="html">
    <div class="page has-menu has-footer home-page">
        <Menu>Monthly Report</Menu>

        <month @changed="monthChanged"></month>


        <!-- when loading  -->
        <div class="text-center" v-show="isLoading">
            <h4>Loading...</h4>
        </div>
        <!-- End of loading  -->


        <!-- Nothing to display  -->
        <div class="text-center" v-show="!hasData">
            <h4 class="bold mt-20 grey">No data to display</h4>
            <div style="font-size:150px">
                <i class="ion-alert-circled greyer"></i>
            </div>
        </div>
        <!-- End of nothing to display  -->


        <div class="charts">
            <!-- <div id="chart"></div> -->
            <vue-c3 :handler="handler"></vue-c3>
        </div>
        <!-- End of charts  -->



        <!-- is not laoding  -->
        <div v-show="showData">
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
import month from './components/date'
import _ from 'lodash'

export default {
    name: 'home-page',
    mixins: [statsMixins],
    components: { month },

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

    computed: {
        total () {
            return this.income - this.expense
        },

        hasData () {
            return this.categories.length
        },

        showData () {
            if (!this.isLoading && this.hasData) {
                return true
            } return false
        }
    },

    methods: {
        async getStats () {
            this.isLoading = true
            try {
                const today = window.moment(this.month, 'MMMM YYYY').format('YYYY-MM-DD')
                const response = await this.$api.get('/stats/monthly/' + today)

                this.incomes = response.data.income
                this.expenses = response.data.expenses

                this.buildIncome()
                this.buildExpensesAndCategories()
            } catch (error) {
                console.log(error)
            }
            this.isLoading = false
        },

        buildIncome () {
            this.income = 0

            if (this.incomes.length) {
                this.incomes.forEach(i => {
                    this.income += parseFloat(i.amount)
                })
            }
        },

        monthChanged (e) {
            this.month = e
            this.getStats()
        },

        buildExpensesAndCategories () {
            this.expense = 0
            this.categories = []

            if (this.expenses.length === 0) {
                this.categories = []
                this.destroyPie()
                return
            }

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
