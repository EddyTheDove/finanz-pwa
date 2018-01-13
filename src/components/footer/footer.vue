<template lang="html">
    <footer>
        <div class="_footer-container">
            <div class="_footer-buttons">
                <div class="_footer-button first green" @click="addIncome()">
                    <i class="ion-arrow-graph-up-right"></i> Add Income
                </div>
                <div class="_footer-button red" @click="addExpense()">
                    <i class="ion-arrow-graph-down-right"></i> Add Expense
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'mainFooter',

    methods: {
        addIncome () {
            window.eventBus.$emit('incomeModal:open')
        },

        addExpense () {
            window.eventBus.$emit('expenseModal:open')
        }
    }
}
</script>
