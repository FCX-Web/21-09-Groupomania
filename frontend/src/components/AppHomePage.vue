<template>
<div id="homepage">
    <img src="../assets/wallpaper_site.png" alt="background groupomania">
    <h1>Bienvenue sur 9GM !!!</h1>
    <div class="button-collection">
        <b-button variant="danger" class="mb-2 button" v-b-modal.modal-signin>
            <b-icon icon=" box-arrow-in-left" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal id="modal-signin" size="lg" title="Merci de saisir vos identifiants " hide-header-close centered>
            <SignIn />
        </b-modal>
        <b-button variant="danger" class="mb-2 button" v-b-modal.modal-signup>
            <b-icon icon=" pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal id="modal-signup" size="lg" title="Merci de saisir vos identifiants" hide-header-close centered>
            <SignUp />
        </b-modal>
    </div>
</div>
</template>

<script>
import SignUp from "./SignUp.vue"
import SignIn from "./SignIn.vue"

export default {
    name: "AppHomePage",
    components: {
        SignUp,
        SignIn
    },
    data() {
        return {}
    },
    methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        }
    },
}
</script>

<style lang="scss" scoped>
#homepage {
    overflow: hidden;
    position: relative;
}

img {
    max-width: 1340px;
    margin: 0 0 20px;
    object-fit: cover;
}

h1 {
    margin: 20px;
    font-size: 3rem;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    color: #003366;
    opacity: 0.8;
    position: absolute;
    top: 45%;
    left: 2%;
}

.button-collection {
    display: flex;
    justify-content: center;

}

.button {
    margin: 0 20px;
}
</style>
