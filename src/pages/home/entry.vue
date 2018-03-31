<template lang="html">
    <div class="entry"
        :class="{expense: isExpense}">
        <div class="container" v-touch:swipe="swipeHandler">

            <div class="row transitioned"
                @click="expand()"
                v-show="swiped == 'right'">
                <div class="col-xs-8" >
                    <div class="category" v-if="hasCategory">{{ entry.category.name }}</div>
                    <div class="description bold" v-if="!hasCategory">{{ entry.description }}</div>
                    <div class="date">{{ date }}</div>

                </div>

                <div class="col-xs-4">
                    <div class="amount">
                        {{ entry.amount | currency }}
                    </div>
                </div>
            </div>


            <!-- Show on swipe  -->
            <div class="text-center transitioned" v-show="swiped == 'left'">
                <button class="btn btn-grey btn-lg" @click="swiped = 'right'">
                    CANCEL
                </button>

                <button class="btn btn-red btn-lg" @click="remove()">
                    DELETE
                </button>
            </div>
            <!-- End of swipe actions  -->
        </div>

        <div class="expanded" v-show="expanded && swiped == 'right'">
            <div class="sub" v-if="suber">{{ suber.name }}</div>
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
            expanded: false,
            swiped: 'right'
        }
    },

    computed: {
        hasCategory () {
            return this.entry.category
        },

        suber () {
            return this.entry.sub
        },

        isExpense () {
            return this.entry.type === 'expense'
        },

        date () {
            let d = moment(this.entry.date)
            return d.format('DD MMM YYYY')
        }
    },

    methods: {
        expand () {
            if (this.isExpense) {
                this.expanded = !this.expanded
            }
        },

        swipeHandler (e) {
            this.swiped = e
        },

        remove () {
            this.$emit('remove', this.entry)
        }
    }
}
</script>
