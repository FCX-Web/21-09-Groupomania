<template>
<div>
    <span class="my-4" style="font-weight: bold">Documents partagés : </span>
    <span style="padding:0 0 0 23px" :key="this.$store.state.posts">
        <slot name="posts"></slot>
    </span>
    <p><span class="my-4" style="font-weight: bold">Commentaires postés :</span>
        <span style="padding:0 0 0 17px" :key="this.$store.state.comments">
            <slot name="comments"></slot>
        </span></p>
    <span class="my-4" style="font-weight: bold">Likes reçus :</span>
    <span style="padding:0 0 0 4px" :key="this.$store.state.likes">
        <slot name="likes"></slot>
    </span>
</div>
</template>

<script>
export default {
    name: "NavProfil",
        methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 30px;
    ;
}
</style>
