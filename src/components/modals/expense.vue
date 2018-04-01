<template lang="html">
    <div class="_modal" :class="{ isOpen: isOpen }">
        <div class="_modal-container">
            <div class="_modal-header">
                <div class="_close" @click="close()">
                    <i class="ion-android-close"></i>
                </div>

                <div class="_heading">
                    <i class="ion-arrow-graph-down-right"></i>
                    Add Expense
                </div>
            </div>


            <div class="_modal-body">
                <form class="_form" @submit.prevent="validate()">

                    <flat-pickr
                        v-model="ghost.date"
                        class="_form-invisible bold blue uppercase"
                        :config="flatpickrOptions">
                    </flat-pickr>

                    <div class="row mt-10">
                        <div class="col-xs-6">
                            <div class="_form-group">
                                <select class="_form-select" v-model="ghost.category">
                                    <option value="">Category</option>
                                    <option v-for="c in categories" :value="c._id">{{ c.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-xs-6">
                            <div class="_form-group">
                                <select class="_form-select" v-model="ghost.sub">
                                    <option value="">Sub Category</option>
                                    <option v-for="c in subs" :value="c._id">{{ c.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

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
                                placeholder="Description"
                                name="description"
                                v-validate="'required'"
                                v-model="ghost.description">
                        </div>
                    </div>

                    <div class="mt-30 text-right">
                        <button class="btn btn-info btn-lg elevated w-150 bold"
                            :disabled="isLoading">
                            <span v-show="!isLoading">Save Expense</span>
                            <span v-show="isLoading">Saving...</span>
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
    name: 'expenseModal',
    mixins: [modalsMixins, modalMixins],

    mounted () {
        window.eventBus.$on('expenseModal:open', () => this.open())
        window.eventBus.$on('expenseModal:close', () => this.close())
    },

    watch: {
        'ghost.category': function (val) {
            console.log(val)
            this.ghost.sub = ''

            if (val === '') {
                this.subs = []
            } else {
                this.categories.forEach(c => {
                    if (this.ghost.category === c._id) {
                        this.subs = c.subs
                    }
                })
            }
        }
    },

    methods: {
        validate () {
            if (this.ghost.category === '') {
                this.$alert.error('Please select a category')
                return
            }
            this.ghost.type = 'expense'
            this.save()
        },

        showMessage () {
            this.$alert.success('Expense successfully saved')
        }
    }
}
</script>
