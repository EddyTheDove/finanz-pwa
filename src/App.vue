<template>
    <div id="app">
        <section>
            <Alert></Alert>
            <Sidebar></Sidebar>

            <transition
                :duration="100"
                name="custom-classes-transition"
                enter-active-class="animated fadeIn">
                <router-view></router-view>
            </transition>

            <IncomeModal></IncomeModal>
            <expenseModal></expenseModal>
        </section>
    </div>
</template>

<script>
import env from '../env'
import Alert from '@/components/alert/alert'

export default {
    name: 'app',
    components: { Alert },

    computed: {
        token () {
            return localStorage.getItem(env.TOKEN)
        }
    },

    mounted () {
        if (this.token) {
            this.$store.dispatch('user/getUser')
            this.$store.dispatch('category/getCategories')
        }
    }
}
</script>

<style lang="scss">
@import "./assets/sass/app.scss";
</style>
