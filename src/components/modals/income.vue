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
                <form class="_form" @submit.prevent="validate()">

                    <flat-pickr
                        v-model="ghost.date"
                        class="_form-invisible bold blue uppercase"
                        :config="flatpickrOptions">
                    </flat-pickr>

                    <div class="_form-group mt-20">
                        <div class="inner-addon left-addon">
                            <i class="glyphicon ion-cash"></i>
                            <input type="number" step="0.01"
                                class="_form-material bold"
                                placeholder="Amount *"
                                name="amount"
                                v-validate="'required'"
                                v-model="ghost.amount">
                        </div>
                        <span class="_form-error" v-show="errors.has('amount')">{{ errors.first('amount') }} <br></span>
                    </div>

                    <div class="_form-group mt-40">
                        <div class="inner-addon left-addon">
                            <i class="glyphicon ion-android-textsms"></i>
                            <input type="text"
                                class="_form-material bold"
                                placeholder="Description *"
                                name="description"
                                v-validate="'required'"
                                v-model="ghost.description">
                        </div>
                        <span class="_form-error" v-show="errors.has('description')">{{ errors.first('description') }} <br></span>
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
import modalsMixins from '@/mixins/modal'
import modalMixins from './mixins'

export default {
    name: 'incomeModal',
    mixins: [modalsMixins, modalMixins],

    mounted () {
        window.eventBus.$on('incomeModal:open', () => this.open())
        window.eventBus.$on('incomeModal:close', () => this.close())
    },

    methods: {
        validate () {
            this.ghost.type = 'income'
            this.save()
        },

        showMessage () {
            this.$alert.success('Income successfully saved')
        }
    }
}
</script>
