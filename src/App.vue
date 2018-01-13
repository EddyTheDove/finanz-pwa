<template>
    <div id="app">
        <section>
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
export default {
    name: 'app'
}
</script>

<style lang="scss">
@import "./assets/sass/app.scss";
</style>
