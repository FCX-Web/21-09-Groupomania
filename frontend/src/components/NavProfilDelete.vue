<template>
<div id="trash-section">
    <b-button id="trash" variant="outline-dark" class="mb-2" @click="delUser">
        <b-icon icon="trash" scale="0.8" aria-hidden="true"></b-icon>
    </b-button>
</div>
</template>

<script>
import axios from "axios"
export default {
    name: "NavProfilDelete",
    methods: {
        delUser() {
            if (confirm("Vous confirmez la suppression du compte ?")) {
                axios
                    .delete("http://localhost:3000/api/pictures/many/" + this.$store.state.userId, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token
                        }
                    })
                    .then(() => {
                        axios
                            .delete("http://localhost:3000/api/comments/many/" + this.$store.state.userId, {
                                headers: {
                                    'Authorization': 'Bearer ' + this.$store.state.token
                                }
                            })
                            .then(() => {
                                const delData = {
                                    userId: JSON.parse(localStorage.getItem("userDatas")).userId,
                                }
                                axios
                                    .delete(
                                        "http://localhost:3000/api/auth/deleteUser", {
                                            data: delData
                                        }
                                    )
                                    .then(response => {
                                        console.log(response);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                                this.$store.state.token = null,
                                    this.$store.state.firstName = null,
                                    this.$store.state.lastName = null,
                                    this.$store.state.status = null,
                                    this.$store.state.likes = null,
                                    this.$store.state.comments = null,
                                    this.$store.state.posts = null,
                                    this.$store.state.userId = null,
                                    localStorage.setItem("userDatas", null),
                                    localStorage.setItem("users", null),
                                    localStorage.setItem("picturesDatas", null),
                                    localStorage.setItem("commentsDatas", null),
                                    localStorage.setItem("likesCont", null)
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.input__field {
    margin-bottom: 10px;
}

.button {
    margin: 0 20px;
}

#trash-section {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

#trash {
    margin-right: 10px;
}
</style>
