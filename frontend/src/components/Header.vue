<template>
<div id="header-container">
    <!--logo-->
    <img src="../assets/logo_groupomania.png" alt="logo groupomania">
    <!--button-->
    <b-button v-if="$store.state.token" variant="danger" class="mb-2" @click="logout">
        <b-icon icon="power" aria-hidden="true"></b-icon>
    </b-button>
</div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout() {
            if (confirm("Vous confirmez la déconnexion ? ")) {
                this.$store.state.token = null
                this.$store.state.firstName = null
                this.$store.state.lastName = null
                this.$store.state.status = null
                this.$store.state.likes = null
                this.$store.state.comments = null
                this.$store.state.posts = null
                this.$store.state.userId = null
                localStorage.setItem("userDatas", null)
                localStorage.setItem("picturesDatas", null)
                localStorage.setItem("users", null)
                localStorage.setItem("commentsDatas", null)
                localStorage.setItem("likesCont", null)
            }
        },
        sendisloggedout() {
            this.$store.dispatch('isloggedout')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
#header-container {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (max-width: 419px) {
    #header-container {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
}
</style>
