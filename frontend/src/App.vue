<template>
<div id="app">
    <main>
        <header>
            <Header />
        </header>
        <div :key="$store.state.token">
            <AppHomePage v-if="!$store.state.token"></AppHomePage>
            <router-view v-if="$store.state.token"></router-view>
        </div>
        <footer>
            <Footer />
        </footer>
    </main>
</div>
</template>

<script>
import AppHomePage from './components/AppHomePage.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
    name: 'App',
    components: {
        AppHomePage,
        Header,
        Footer
    },
    methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        }
    },
    beforeMount() {
        this.sendisloggedin()
    }
}
</script>

<style lang="scss">
main {
    margin: 20px auto;
    max-width: 1340px;
}

header {
    margin: 0 20px 5px -10px;
}

footer {
    margin: 0 20px;
    padding-top: 20px;
    border-top: 2px solid #000000;
}

@media screen and (max-width: 350px) {
    header {
        margin: 0 0 5px;
    }
}
</style>
