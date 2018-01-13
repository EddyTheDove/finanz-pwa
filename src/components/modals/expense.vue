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
                <form class="_form" @submit.prevent>

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
                                    <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-xs-6">
                            <div class="_form-group">
                                <select class="_form-select" v-model="ghost.sub">
                                    <option value="">Sub Category</option>
                                    <option v-for="c in subs" :value="c.id">{{ c.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>

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
                        <button type="submit" class="btn btn-lg btn-info elevated round">
                            Save Expense
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
    name: 'expenseModal',
    mixins: [modalMixins],

    mounted () {
        window.eventBus.$on('expenseModal:open', () => this.open())
        window.eventBus.$on('expenseModal:close', () => this.close())
        this.getCategories()
    },

    watch: {
        'ghost.category': function (val) {
            this.ghost.sub = ''

            if (val === '') {
                this.subs = []
            } else {
                this.categories.forEach(c => {
                    if (this.ghost.category === c.id) {
                        this.subs = c.subs
                    }
                })
            }
        }
    },

    methods: {
        getCategories () {
            this.categories = [
                {
                    id: 1,
                    name: 'Car',
                    subs: [
                        { id: 2, name: 'Fuel' },
                        { id: 3, name: 'Insurance' },
                        { id: 4, name: 'Wash' }
                    ]
                },

                {
                    id: 2,
                    name: 'Bills',
                    subs: [
                        { id: 5, name: 'Rent' },
                        { id: 6, name: 'Electricity' }
                    ]
                }
            ]
        }
    }
}
</script>
