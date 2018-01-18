<template lang="html">
    <div class="page has-menu has-footer">
        <Menu>
            {{ title }}
            <span class="pull-right" @click="add()">
                <i class="ion-plus"></i>
            </span>
        </Menu>

        <div class="categories-page">
            <div class="_categories">
                <div class="_block shadowed pointer" v-for="c in categories" @click="edit(c)">
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
        <editCategory :editing="editing"></editCategory>
        <Footer></Footer>
    </div>
</template>

<script>
import addCategory from './modals/add-category'
import editCategory from './modals/edit-category'

export default {
    name: 'categories',
    components: { addCategory, editCategory },

    data: () => ({
        category: {},
        isLoading: false,
        showColours: false,
        colour: '#1abc9c',
        colours: [],
        editing: {}
    }),

    computed: {
        categories () {
            return this.$store.state.category.categories
        },

        title () {
            if (this.categories.length === 0) {
                return 'Categories'
            } else {
                if (this.categories.length === 1) {
                    return '1 Category'
                } else {
                    return this.categories.length + ' Categories'
                }
            }
        }
    },

    methods: {
        add () {
            window.eventBus.$emit('newCategoryModal:open')
        },

        edit (category) {
            this.editing = category
            window.eventBus.$emit('editCategoryModal:open')
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
