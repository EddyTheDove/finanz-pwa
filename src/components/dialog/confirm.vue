<template lang="html">
    <div class="_confirm" :class="[{ isOpen: isOpen }]" @click="close()">
        <div class="_confirm-outside"></div>


        <div class="v-align">
            <div class="_confirm-container">
                <div class="_confirm-title" v-show="title">
                    {{ title }}
                </div>

                <div class="_confirm-message">
                    {{ message }}
                </div>


                <div class="_confirm-buttons">
                    <div class="_confirm-button left" @click="close()">
                        Cancel
                    </div>

                    <div class="_confirm-button" @click="confirmed()">
                        Confirm
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: ['title', 'message', 'display'],

    data: () => ({
        isOpen: true
    }),

    mounted () {
        this.isOpen = this.display
    },

    watch: {
        display: function (val) {
            this.isOpen = val
        }
    },

    methods: {
        close () {
            this.$emit('closed', {})
        },

        confirmed () {
            this.$emit('confirmed', {})
        }
    }
}
</script>
