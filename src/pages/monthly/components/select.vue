<template lang="html">
    <div class="_confirm" :class="[{ isOpen: isOpen }]">
        <div class="_confirm-outside" @click="close()"></div>


        <div class="v-align">
            <div class="_confirm-container">
                <div class="_confirm-title">
                    Select Month & Year
                </div>

                <div class="_form mt-10">
                    <div class="row pd-10">
                        <div class="col-xs-7">
                            <select class="_form-select" v-model="month">
                                <option v-for="m in months" :value="m">{{ m }}</option>
                            </select>
                        </div>

                        <div class="col-xs-5">
                            <select class="_form-select" v-model="year">
                                <option v-for="m in years" :value="m">{{ m }}</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="_confirm-buttons">
                    <div class="_confirm-button left" @click="close()">
                        Cancel
                    </div>

                    <div class="_confirm-button" @click="confirmed()">
                        Confirm
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'month-select',
    props: ['date', 'open'],

    data: () => ({
        isOpen: false,
        month: '',
        year: '',
        currentDate: '',
        months: [],
        years: []
    }),

    mounted () {
        this.buildList()
    },

    watch: {
        date (value) {
            this.currentDate = window.moment(value, 'MMMM YYYY')
            this.month = window.moment(value, 'MMMM YYYY').format('MMMM')
            this.year = window.moment(value, 'MMMM YYYY').format('YYYY')
        },

        open (value) {
            this.isOpen = value
        }
    },

    methods: {
        close () {
            this.$emit('closed', {})
        },

        confirmed () {
            const monthYear = this.month + ' ' + this.year
            const selected = window.moment(monthYear, 'MMMM YYYY')

            if (window.moment().isSameOrBefore(selected)) {
                this.month = window.moment().format('MMMM')
                return this.$alert.info('You cannot view future dates')
            }

            this.$emit('selected', selected)
            this.close()
        },

        buildList () {
            this.months = window.moment().localeData().months()
            this.years = []

            for (let y = 2017; y <= window.moment().year(); y++) {
                this.years.push('' + y)
            }
        }
    }

}
</script>
