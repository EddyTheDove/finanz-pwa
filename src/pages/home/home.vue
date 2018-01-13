<template lang="html">
    <div class="page has-menu has-footer home-page">
        <Menu>Finanz</Menu>

        <div class="moneys">
            <div class="row">
                <div class="col-xs-4">
                    <div class="medium">
                        <h4 class="green">{{ income | currency }}</h4>
                        <h4 class="red">-{{ expenses | currency }}</h4>
                    </div>
                </div>

                <div class="col-xs-8">
                    <div class="large text-right">
                        <h5>Balance</h5>
                        <h3 class="no-margin">{{ total | currency }}</h3>
                    </div>
                </div>
            </div>
        </div>


        <div class="entries mt-20">
            <Entry v-for="e in entries" :entry="e" :key="e.id"></Entry>
        </div>

        <div class="mt-40 text-center">
            <button  class="btn btn-info btn-lg elevated w-200">Load More</button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Entry from './entry'
export default {
    name: 'home-page',
    components: { Entry },

    data () {
        return {
            pie: {},
            income: 92000.00,
            expenses: 87456.45,
            entries: []
        }
    },

    mounted () {
        this.getEntries()
    },

    computed: {
        total () {
            return this.income - this.expenses
        }
    },

    methods: {
        getEntries () {
            this.entries = [
                {
                    id: 1,
                    description: "Mama's deposit",
                    type: 'income',
                    amount: 3000.00,
                    date: '23/12/2017'
                },
                {
                    id: 2,
                    category: 'Car',
                    sub: 'Fuel',
                    description: 'Fuel to Camden',
                    amount: 44.29,
                    type: 'expense',
                    date: '19/12/2017'
                },
                {
                    id: 3,
                    category: 'House',
                    sub: 'Internet',
                    description: 'November bill that I found money in the street in Central Park when coming back from the lecture',
                    amount: 44.29,
                    type: 'expense',
                    date: '13/12/2017'
                },
                {
                    id: 4,
                    description: "Eddy's Food",
                    type: 'income',
                    amount: 99.99,
                    date: '11/12/2017'
                },
                {
                    id: 5,
                    category: 'House',
                    sub: 'Food',
                    description: 'Uber Eats',
                    amount: 29.40,
                    type: 'expense',
                    date: '11/12/2017'
                }
            ]
        }
    }
}
</script>
