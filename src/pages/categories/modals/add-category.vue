<template lang="html">
    <div class="_modal" :class="{ isOpen: isOpen }">
        <div class="_modal-container">
            <div class="_modal-header">
                <div class="_close" @click="close()">
                    <i class="ion-android-close"></i>
                </div>

                <div class="_heading">
                    <i class="ion-ios-pricetag mr-10"></i>
                    Add Category
                </div>
            </div>


            <div class="_modal-body">
                <form class="_form" @submit.prevent>

                    <div class="_form-group mt-20">
                        <input type="text"
                            class="_form-input bold"
                            placeholder="Category name"
                            name="name"
                            v-validate="'required'"
                            autocomplete="off"
                            v-model="category.name">
                        <span class="_form-error" v-show="errors.has('name')">{{ errors.first('name') }} <br></span>
                    </div>

                    <div class="colours">
                        <label>
                            <span class="_dot" :style="'margin-top:5px; background-color:' + colour"></span>
                            Select Colour
                        </label>

                        <ul class="list-inline mt-10">
                            <li v-for="c in availableColours"
                                @click="selectColour(c)"
                                :style="'background-color:' + c">
                                <i class="ion-checkmark" v-show="colour == c"></i>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>


                    <subsComponent
                        @added="pushSub"
                        @removed="removeSub"
                        :subcategories="subcategories">
                    </subsComponent>


                    <div class="mt-40 text-center">
                        <button
                            @click="validate()"
                            class="btn btn-lg btn-info elevated w-150 bold">
                            <span v-show="!isLoading">Save Category</span>
                            <span v-show="isLoading">Saving...</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixins from '@/mixins/modal'
import coloursMixins from '../mixins'
import subsComponent from '../subs'

export default {
    name: 'newCategoryModal',
    mixins: [modalMixins, coloursMixins],
    components: { subsComponent },

    mounted () {
        window.eventBus.$on('newCategoryModal:open', () => this.open())
        window.eventBus.$on('newCategoryModal:close', () => this.close())
    },

    methods: {
        async validate () {
            this.isLoading = true
            this.category.colour = this.colour
            this.category.subs = this.subcategories

            try {
                await this.$api.post('/categories', this.category)
                this.$store.dispatch('category/getCategories', this.category)
                this.category = {}
                this.subcategories = []
                this.$alert.success('New category successfully saved')
                this.close()
            } catch (error) {
                console.log('error', error)
                this.$alert.error(error.response.data)
            }
            this.isLoading = false
        }
    }
}
</script>
