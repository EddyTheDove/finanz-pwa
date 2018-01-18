<template lang="html">
    <div class="_slideout" :class="{ isOpen: isOpen }">
        <div class="_slideout-brand" @click="close()">
            Close
        </div>

        <ul class="_slideout-menu">
            <li v-for="m in menu">
                <a @click="openLink(m)">{{ m.label }}</a>
            </li>

            <hr>

            <li>
                <a @click="signout">Sign Out</a>
            </li>
        </ul>

    </div>
</template>

<script>
import AuthService from '@/services/auth'

export default {
    name: 'sidebar',

    data: () => ({
        menu: [
            { label: 'Home', name: 'home', url: '/' },
            { label: 'Categories', name: 'categories', url: '/categories' },
            { label: 'Monthly Report', name: 'monthly', url: '/monthly' },
            { label: 'My Account', name: 'account', url: '/account' }
        ]
    }),

    computed: {
        isOpen () {
            return this.$store.state.sidebar.isOpen
        }
    },

    methods: {
        open () {
            this.$store.commit('sidebar/SIDEBAR_OPEN')
        },

        close () {
            this.$store.commit('sidebar/SIDEBAR_CLOSE')
        },

        toggle () {
            this.$store.commit('sidebar/SIDEBAR_TOGGLE')
        },

        openLink (link) {
            this.close()
            this.$router.push(link)
        },

        signout () {
            AuthService.logout()
        }
    }
}
</script>
