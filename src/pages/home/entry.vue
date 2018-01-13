<template lang="html">
    <div class="_block shadowed entry" :class="{expense: isExpense}" @click="expand()">
        <div class="_block-container">
            <div class="row">
                <div class="col-xs-8">
                    <div class="category" v-if="hasCategory">{{ entry.category }}</div>
                    <div class="description" v-if="!hasCategory">{{ entry.description }}</div>
                    <div class="date">{{ date }}</div>

                </div>

                <div class="col-xs-4">
                    <div class="amount">
                        {{ entry.amount | currency }}
                    </div>
                </div>
            </div>
        </div>

        <div class="expanded" v-show="expanded">
            <div class="sub">{{ entry.sub }}</div>
            <div class="description">{{ entry.description }}</div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'entry',
    props: ['entry'],

    data () {
        return {
            expanded: false
        }
    },

    computed: {
        hasCategory () {
            return this.entry.category
        },

        isExpense () {
            return this.entry.type === 'expense'
        },

        date () {
            let d = moment(this.entry.date, 'DD/MM/YYYY')
            return d.format('DD MMM YYYY')
        }
    },

    methods: {
        expand () {
            if (this.isExpense) {
                this.expanded = !this.expanded
            }
        }
    }
}
</script>
