<template lang="html">
    <div class="page has-menu has-footer">
        <Menu>
            Categories
            <span class="pull-right">
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
                            <!-- <span class="bold pull-right">{{ c.amount | currency }}</span> -->
                        </h4>
                    </div>
                </div>
            </div>
        </div>


        <Footer></Footer>
    </div>
</template>

<script>
export default {
    name: 'categories',

    computed: {
        categories () {
            return this.$store.state.category.categories
        }
    }
}
</script>
