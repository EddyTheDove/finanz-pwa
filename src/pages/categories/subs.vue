<template lang="html">
    <div class="">
        <!-- add sub categories  -->
        <h4 class="bold mt-20">Sub categories</h4>
        <h5 v-show="message" class="pb-10">{{ message }}</h5>

        <!-- Subs list  -->
        <ul class="_subs-list list-unstyled bold fs-16">
            <li v-for="s in subcategories">
                <i class="pull-right ion-close" @click="confirm(s)"></i>
                {{ s.name }}
            </li>
        </ul>
        <!-- End of subs list  -->

        <div class="row">
            <div class="col-xs-9">
                <div class="_form-group">
                    <input type="text"
                        class="_form-input bold"
                        placeholder="Add a category"
                        v-model="sub">
                </div>
            </div>

            <div class="col-xs-3 no-padding">
                <button
                    @click="pushSub()"
                    class="btn btn-lg btn-success elevated bold btn-block">
                    <span v-show="!isLoading"><i class="ion-checkmark"></i> </span>
                    <span v-show="isLoading"><i class="ion-more"></i> </span>
                </button>
            </div>
        </div>
        <!-- End of sub category -->

        <confirmDialog
            :display="showConfirm"
            @closed="showConfirm = false"
            @confirmed="confirmed"
            :message="'Deleting a sub category will also delete all its expenses. This action is permanent.'"
            :title="'Confirm Deletion'">
        </confirmDialog>
    </div>
</template>

<script>
import confirmDialog from '@/components/dialog/confirm'

export default {
    name: 'subs',
    props: ['subcategories', 'message', 'category'],
    components: { confirmDialog },

    data: () => ({
        sub: '',
        deleting: {},
        isLoading: false,
        showConfirm: false
    }),

    computed: {
        showWarning () {
            if (this.message && this.subcategories.length) {
                return true
            } return false
        }
    },

    methods: {
        pushSub () {
            if (this.showWarning) {
                this.addSub()
            } else {
                this.$emit('added', { name: this.sub })
                this.sub = ''
            }
        },

        async addSub () {
            this.isLoading = true
            try {
                const response = await this.$api.post('/subs', {
                    name: this.sub,
                    category: this.category._id
                })

                this.$emit('added', response.data)
            } catch (error) {
                console.log(error)
            }

            this.isLoading = false
            this.sub = ''
        },

        confirm (sub) {
            this.deleting = sub
            this.showConfirm = true
        },

        confirmed () {
            this.showConfirm = false
            this.$emit('deleteSub', this.deleting)
        }
    }
}
</script>
