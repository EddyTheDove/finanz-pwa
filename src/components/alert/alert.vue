<template lang="html">
    <div class="_alert" :class="[{ isOpen: isOpen }]" @click="close()">
        <div class="_alert-container" :class="type">
            <span class="_close"><i class="ion-close"></i></span>
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',

    data: () => ({
        type: 'info',
        message: '',
        timer: null,
        isOpen: false
    }),

    mounted () {
        window.eventBus.$on('alert:show', (e) => {
            this.display(e)
        })
    },

    methods: {
        display (e) {
            if (this.timer) clearTimeout(this.timer)
            this.isOpen = true
            this.message = e.message
            this.type = e.type

            const _this = this
            this.timer = setTimeout(() => {
                _this.isOpen = false
            }, 5000)
        },

        close () {
            this.isOpen = false
        }
    }
}
</script>
