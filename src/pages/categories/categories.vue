<template lang="html">
    <div class="page has-menu has-footer">
        <Menu>
            Categories
            <span class="pull-right" @click="add()">
                <i class="ion-plus"></i>
            </span>
        </Menu>

        <div class="categories-page">
            <div class="_categories">
                <div class="_block shadowed pointer" v-for="c in categories">
                    <div class="_block-container">
                        <h4>
                            <div class="_dot" :style="'background-color:' + c.colour"></div>
                            {{ c.name }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>

        <addCategory></addCategory>
        <Footer></Footer>
    </div>
</template>

<script>
import addCategory from './modals/add-category'

export default {
    name: 'categories',
    components: { addCategory },

    data: () => ({
        category: {},
        isLoading: false,
        showColours: false,
        colour: '#1abc9c',
        colours: []
    }),

    computed: {
        categories () {
            return this.$store.state.category.categories
        }
    },

    methods: {
        add () {
            window.eventBus.$emit('newCategoryModal:open')
        },

        validate () {
            console.log('trying to add category')
        },

        selectColour (c) {
            this.colour = c
        }
    }
}
</script>
