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
                <form class="_form" @submit.prevent="validate()">

                    <div class="_form-group mt-20">
                        <input type="text"
                            class="_form-input bold"
                            placeholder="Category name"
                            name="name"
                            v-validate="'required'"
                            v-model="category.name">
                        <span class="_form-error" v-show="errors.has('name')">{{ errors.first('name') }} <br></span>
                    </div>

                    <div class="colours">
                        <label @click="showColours = !showColours">
                            <span class="_dot" :style="'margin-top:5px; background-color:' + colour"></span>
                            Set Colour
                            <i class="ion-arrow-down-b"></i>
                        </label>

                        <ul class="list-inline mt-10" v-show="showColours">
                            <li v-for="c in colours"
                                @click="selectColour(c)"
                                :style="'background-color:' + c">
                                <i class="ion-checkmark" v-show="colour == c"></i>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>


                    <div class="mt-40 text-center">
                        <button type="submit" class="btn btn-lg btn-info elevated w-150">
                            Save
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

export default {
    name: 'newCategoryModal',
    mixins: [modalMixins, coloursMixins],

    data: () => ({
        category: {},
        colour: '#1abc9c'
    }),

    mounted () {
        window.eventBus.$on('newCategoryModal:open', () => this.open())
        window.eventBus.$on('newCategoryModal:close', () => this.close())
    },

    methods: {
        selectColour (c) {
            console.log('setting colour', c)
            this.colour = c
            console.log('category', this.colour)
        },

        validate () {
            console.log('validating new category')
        }
    }
}
</script>
