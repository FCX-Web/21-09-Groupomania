<template>
<div class="px-3 py-2">
    <div>
        <b-form-input v-model="email" type="email" class="aside-post input__field" placeholder="Votre email" required></b-form-input>
        <b-form-input v-model="password" type="password" class="aside-post input__field" placeholder="Votre mot de passe" required></b-form-input>
    </div>
</div>
</template>

<script>
import axios from "axios"

export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    beforeDestroy() {
        const postData = {
            email: this.email,
            password: this.password
        }
        axios
            .post(
                "http://localhost:3000/api/auth/signin",
                postData
            )
            .then(response => {
                localStorage.setItem("userDatas", JSON.stringify({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    status: response.data.status,
                    likes: response.data.likes,
                    comments: response.data.comments,
                    posts: response.data.posts,
                    token: response.data.token,
                    userId: response.data.userId
                }))
                this.$store.state.firstName = JSON.parse(localStorage.getItem("userDatas")).firstName
                this.$store.state.lastName = JSON.parse(localStorage.getItem("userDatas")).lastName
                this.$store.state.status = JSON.parse(localStorage.getItem("userDatas")).status
                this.$store.state.likes = JSON.parse(localStorage.getItem("userDatas")).likes
                this.$store.state.comments = JSON.parse(localStorage.getItem("userDatas")).comments
                this.$store.state.posts = JSON.parse(localStorage.getItem("userDatas")).posts
                this.$store.state.userId = JSON.parse(localStorage.getItem("userDatas")).userId
                this.$store.state.token = JSON.parse(localStorage.getItem("userDatas")).token

                this.$bvModal.msgBoxOk('Connexion réussie !!!', {
                    title: '',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'primary',
                    okTitle: 'OK',
                    footerClass: 'p-2',
                    hideHeaderClose: true,
                    centered: true
                })
            })
            .catch(error => console.log(error));
    },
}
</script>

<style lang="scss" scoped>
.input__field {
    margin-bottom: 10px;
}

.button {
    margin: 0 20px;
}
</style>
