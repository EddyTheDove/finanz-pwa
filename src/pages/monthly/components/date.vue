<template lang="html">
    <div class="current-month">
        <span class="month-nav nav-left" @click="previousMonth()">
              <i class="ion-ios-arrow-back"></i>
        </span>

        <span class="month" @click="isOpen = true">{{ month }}</span>

        <span class="month-nav nav-right" @click="nextMonth()">
              <i class="ion-ios-arrow-forward"></i>
        </span>

        <select-component
            :open="isOpen"
            :date="month"
            @selected="setDate"
            @closed="closeSelect()">
        </select-component>
    </div>
</template>

<script>
import selectComponent from './select'

export default {
    name: 'month',
    components: { selectComponent },

    data: () => ({
        month: '',
        isOpen: false
    }),

    mounted () {
        this.month = window.moment().format('MMMM YYYY')
        this.monthChanged()
    },

    methods: {
        previousMonth () {
            if (!this.isLoading) {
                this.month = window.moment(this.month, 'MMMM YYYY').subtract(1, 'month').format('MMMM YYYY')
                this.monthChanged()
            }
        },

        nextMonth () {
            if (!this.isLoading) {
                let nextMonth = window.moment(this.month, 'MMMM YYYY').add(1, 'month')
                if (window.moment().isSameOrBefore(nextMonth)) {
                    return this.$alert.info('You cannot view future dates')
                }

                this.month = nextMonth.format('MMMM YYYY')
                this.monthChanged()
            }
        },

        setDate (e) {
            this.month = e.format('MMMM YYYY')
            this.monthChanged()
        },

        monthChanged () {
            this.$emit('changed', this.month)
        },

        closeSelect () {
            this.isOpen = false
        }
    }
}
</script>

<style lang="css">
</style>
