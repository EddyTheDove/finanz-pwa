<template lang="html">
    <div class="">
        <!-- add sub categories  -->
        <h4 class="bold mt-20">Sub categories</h4>

        <!-- Subs list  -->
        <ul class="_subs-list list-unstyled bold fs-16">
            <li v-for="s in subcategories" @click="removeSub(s)">
                <i class="pull-right ion-close"></i>
                {{ s.name }}
            </li>
        </ul>
        <!-- End of subs list  -->

        <div class="row">
            <div class="col-xs-9">
                <div class="_form-group">
                    <input type="text"
                        class="_form-input bold"
                        placeholder="Sub category name"
                        v-model="sub">
                </div>
            </div>

            <div class="col-xs-3 no-padding">
                <a @click="pushSub()"
                    class="btn btn-greener btn-block btn-lg">
                    <i class="ion-plus"></i>
                </a>
            </div>
        </div>
        <!-- End of sub category -->
    </div>
</template>

<script>
export default {
    name: 'subs',
    props: ['subcategories'],

    data: () => ({
        sub: ''
    }),

    methods: {
        pushSub () {
            this.$emit('added', this.sub)
            this.sub = ''
        },

        removeSub (sub) {
            this.$emit('removed', sub)
        }
    }
}
</script>
