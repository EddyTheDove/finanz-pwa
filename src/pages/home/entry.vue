<template lang="html">
    <div class="entry"
        :class="{ expense: isExpense }">
        <div class="container">

            <div class="row transitioned"
                v-show="!toggled">
                <div class="col-xs-8" @click="expand()">
                    <div class="category" v-if="hasCategory" >{{ entry.category.name }}</div>
                    <div class="description bold" v-if="!hasCategory">{{ entry.description }}</div>
                    <div class="date">{{ date }}</div>

                </div>

                <div class="col-xs-4">
                    <div class="amount" @click="toggle()">
                        {{ entry.amount | currency }}
                        <i class="ion-android-more-vertical"></i>
                    </div>
                </div>
            </div>


            <!-- Show on swipe  -->
            <div class="entry-options" v-show="toggled">
                <button class="btn btn-red" @click="remove()">
                    DELETE
                </button>
                <button class="btn btn-grey" @click="toggled = false">
                    CANCEL
                </button>
            </div>
            <!-- End of swipe actions  -->
        </div>

        <div class="expanded" v-show="expanded && !toggled">
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
            toggled: false
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

        toggle () {
            this.toggled = !this.toggled
        },

        remove () {
            this.toggled = false
            this.$emit('remove', this.entry)
        }
    }
}
</script>
