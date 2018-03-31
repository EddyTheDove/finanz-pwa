<template lang="html">
    <div class="page has-menu has-footer home-page">
        <Menu>Finanz</Menu>

        <div class="container">
            <div class="moneys">
                <div class="row">
                    <div class="col-xs-4">
                        <div class="medium text-right">
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
        </div>



        <div class="entries mt-20">
            <Entry v-for="e in entries"
                :entry="e"
                :key="e.id"
                @remove="remove">
            </Entry>
        </div>

        <div class="mt-40 text-center" v-show="nextPage">
            <button
                :disabled="isLoading"
                class="btn btn-info btn-lg elevated w-200 bold"
                @click="loadMore()">
                Load More
            </button>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Longpress from 'vue-longpress'
import Entry from './entry'

export default {
    name: 'home-page',
    components: { Entry, Longpress },

    data () {
        return {
            pie: {},
            isLoading: false
        }
    },

    mounted () {
        this.loadEntries()
    },

    computed: {
        user () {
            return this.$store.state.user.user
        },

        income () {
            return this.user.income || 0
        },

        expenses () {
            return this.user.expenses || 0
        },

        total () {
            return this.income - this.expenses
        },

        entries () {
            return this.$store.state.entry.entries
        },

        nextPage () {
            return this.$store.state.entry.nextPage
        }
    },

    methods: {
        async loadEntries () {
            this.isLoading = true

            try {
                await this.$store.dispatch('entry/getEntries')
            } catch (error) {
                console.log('Error', error)
            }

            this.isLoading = false
        },

        async loadMore () {
            if (!this.isLoading) {
                this.isLoading = true

                try {
                    const response = await this.$api.any({
                        method: 'get',
                        url: this.nextPage
                    })

                    let entries = this.entries.slice()
                    entries.push.apply(entries, response.data.data)
                    this.$store.commit('entry/SET_ENTRIES', entries)
                    this.$store.commit('entry/SET_NEXT_PAGE', response.data.next_page)
                } catch (error) {
                    console.log('Error', error)
                }
                this.isLoading = false
            }
        },

        async remove (entry) {
            console.log('entry to be deleted', entry)
            this.$store.dispatch('entry/remove', entry)
        }
    }
}
</script>
