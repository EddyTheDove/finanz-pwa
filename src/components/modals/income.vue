<template lang="html">
    <div class="_modal" :class="{ isOpen: isOpen }">
        <div class="_modal-container">
            <div class="_modal-header">
                <div class="_close" @click="close()">
                    <i class="ion-android-close"></i>
                </div>

                <div class="_heading">
                    <i class="ion-arrow-graph-up-right"></i>
                    Add Income
                </div>
            </div>


            <div class="_modal-body">
                <form class="_form" @submit.prevent>

                    <flat-pickr
                        v-model="ghost.date"
                        class="_form-invisible bold blue uppercase"
                        :config="flatpickrOptions">
                    </flat-pickr>

                    <div class="_form-group mt-10">
                        <label for="amount">Amount</label>
                        <input type="number" step="0.01"
                            class="_form-input"
                            placeholder="Amount"
                            v-model="ghost.amount">
                    </div>

                    <div class="_form-group mt-20">
                        <label for="description">Description</label>
                        <textarea rows="2"
                            class="_form-text"
                            placeholder="Description"
                            v-model="ghost.description"></textarea>
                    </div>

                    <div class="mt-40 text-center">
                        <button type="submit" class="btn btn-lg btn-info elevated">
                            Save Income
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixins from './mixins'

export default {
    name: 'incomeModal',
    mixins: [modalMixins],

    mounted () {
        window.eventBus.$on('incomeModal:open', () => this.open())
        window.eventBus.$on('incomeModal:close', () => this.close())
    },

    methods: {
        showMessage () {
            this.$alert.success('Income successfully saved')
        }
    }
}
</script>
