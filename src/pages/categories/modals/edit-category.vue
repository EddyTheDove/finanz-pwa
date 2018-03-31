<template lang="html">
    <div class="_modal" :class="{ isOpen: isOpen }">
        <div class="_modal-container">
            <div class="_modal-header">
                <div class="_close" @click="close()">
                    <i class="ion-android-close"></i>
                </div>

                <div class="_heading">
                    <i class="ion-ios-pricetag mr-10"></i>
                    Edit Category
                </div>
            </div>


            <div class="_modal-body">
                <div class="_form">

                    <div class="row">
                        <div class="col-xs-9">
                            <div class="_form-group">
                                <input type="text"
                                    class="_form-input bold"
                                    placeholder="Category name"
                                    name="name"
                                    v-validate="'required'"
                                    autocomplete="off"
                                    v-model="category.name">
                                <span class="_form-error" v-show="errors.has('name')">{{ errors.first('name') }} <br></span>
                            </div>
                        </div>

                        <div class="col-xs-3 no-padding">
                            <button
                                @click="udpate()"
                                class="btn btn-lg btn-success elevated bold btn-block">
                                <span v-show="!isLoading"><i class="ion-checkmark"></i> </span>
                                <span v-show="isLoading"><i class="ion-more"></i> </span>
                            </button>
                        </div>
                    </div>
                    <!-- End of sub category -->

                    <div class="colours">
                        <label>
                            <span class="_dot" :style="'margin-top:5px; background-color:' + colour"></span>
                            Change Colour
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
                        @deleteSub="deleteSub"
                        :message="'Deleting a sub category will also delete all its expenses'"
                        :category="editing"
                        :subcategories="subcategories">
                    </subsComponent>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixins from '@/mixins/modal'
import coloursMixins from '../mixins'
import subsComponent from '../subs'
import _ from 'lodash'

export default {
    name: 'editCategoryModal',
    mixins: [modalMixins, coloursMixins],
    components: { subsComponent },
    props: ['editing'],

    mounted () {
        window.eventBus.$on('editCategoryModal:open', () => this.open())
        window.eventBus.$on('editCategoryModal:close', () => this.close())
    },

    watch: {
        editing (val) {
            if (!_.isEmpty(val)) {
                this.resetCategory()
            }
        }
    },

    methods: {
        resetCategory () {
            this.category = Object.assign({}, this.editing)
            this.subcategories = this.editing.subs.slice()
            this.colour = this.category.colour
        },

        async udpate () {
            this.isLoading = true
            this.category.colour = this.colour

            try {
                const response = await this.$api.update('/categories/' + this.category._id, this.category)
                let category = response.data
                category.subs = this.subcategories

                this.$store.dispatch('category/updateCategory', category)
                this.$emit('categoryUpdated', category)
                this.$alert.success('Category successfully udpated')
            } catch (error) {
                this.$alert.error(error.response.data)
            }

            this.isLoading = false
        },

        async deleteSub (e) {
            try {
                this.subcategories = this.subcategories.filter(s => {
                    return s._id !== e._id
                })

                const response = await this.$api.delete('/subs/' + e._id)
                this.$alert.success(response.data)
                this.$store.dispatch('category/getCategories')
            } catch (error) {
                console.log('error', error)
                this.$alert.error(error.response.data)
            }
        }
    }
}
</script>
