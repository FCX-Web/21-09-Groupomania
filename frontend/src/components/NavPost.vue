<template>
<div>
    <b-form-group id="input-group-1" label="Titre :" label-for="input-1" description="">
        <b-form-input id="input-1" class="aside-post" v-model="title" type="text" placeholder="Ecrivez le titre du post ..." required></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-2" label="Votre post :" label-for="input-2">
        <b-form-file id="input-2" v-model="file" type="file" accept="image/*" ref="file-input" class="mb-2" plain></b-form-file>
    </b-form-group>
</div>
</template>

<script>
import axios from "axios"
import FormData from 'form-data'

export default {
    name: "NavPost",
    data() {
        return {
            title: null,
            file: null
        };
    },
    beforeDestroy() {
        let formData = new FormData();
        const post = {
            userId: JSON.parse(localStorage.getItem("userDatas")).userId,
            title: this.title,
            avatarText: this.$store.state.firstName.charAt(0).toUpperCase() + this.$store.state.lastName.charAt(0).toUpperCase()
        };
        formData.append("content", JSON.stringify(post));
        formData.append('image', this.file);
        axios.post('http://localhost:3000/api/pictures/',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + this.$store.state.token
                    }
                }
            )
            .then(response => {
                console.log(response);
                axios.get("http://localhost:3000/api/pictures/", {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token
                        }
                    })
                    .then(pictures => {
                        localStorage.setItem("picturesDatas", JSON.stringify(pictures.data));
                        this.$store.state.pictures = JSON.parse(localStorage.getItem("picturesDatas"));
                        this.$store.state.posts += 1;
                        localStorage.setItem("userDatas", JSON.stringify({
                            firstName: this.$store.state.firstName,
                            lastName: this.$store.state.lastName,
                            status: this.$store.state.status,
                            likes: this.$store.state.likes,
                            comments: this.$store.state.comments,
                            posts: this.$store.state.posts,
                            token: this.$store.state.token,
                            userId: this.$store.state.userId
                        }));
                        const content = {
                            posts: this.$store.state.posts
                        }
                        axios
                            .put(
                                "http://localhost:3000/api/auth/" + this.$store.state.userId, content, {
                                    headers: {
                                        'Authorization': 'Bearer ' + this.$store.state.token
                                    }
                                }
                            )
                            .then(response => {
                                console.log(response);

                                axios.get("http://localhost:3000/api/auth/", {
                                        headers: {
                                            'Authorization': 'Bearer ' + this.$store.state.token
                                        }
                                    })
                                    .then(users => {
                                        localStorage.setItem("users", JSON.stringify(users.data));
                                        this.$store.state.users = JSON.parse(localStorage.getItem("users"));
                                        this.$store.state.users.posts += 1;
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        alert("Post enregistré !!!");
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<style lang="scss" scoped>
#img__select {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
}
</style>
