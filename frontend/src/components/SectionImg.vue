<template>
<div>
    <b-carousel-slide>
        <template #img>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <div @mouseover="show = false" @mouseleave="show = true">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img :src="imageUrl" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="title">
                                <b-card-text>
                                    <h3>
                                        <b-avatar class="mr-3 card-name" variant="secondary" :text="avatarText"></b-avatar>
                                    </h3>
                                    <h3 class="card-date">{{ date | moment("from") }}</h3>
                                    <h3 class="card-score">{{ comments }} commentaires</h3>
                                </b-card-text>
                                <div class="h2 mb-0 like-block">
                                    <div class="hand-thumbs-up-score" :key="testLike">
                                        <b-button v-if="userId == $store.state.userId" disabled variant="link" class="icon-like" @click="likePost(id, userId)">
                                            <b-icon icon="hand-thumbs-up" variant="secondary" font-scale="0.7"></b-icon>
                                        </b-button>
                                        <b-button v-else-if="testLike == true" variant="link" class="icon-like" @click="likePost(id, userId)">
                                            <b-icon icon="hand-thumbs-up" variant="success" font-scale="1"></b-icon>
                                        </b-button>
                                        <b-button v-else variant="link" class="icon-like" @click="likePost(id, userId)">
                                            <b-icon icon="hand-thumbs-up" class="rounded-circle bg-secondary p-2" variant="light" font-scale="1"></b-icon>
                                        </b-button>
                                        <p class="card-like" :key="likes">{{ likes }}</p>
                                    </div>
                                    <b-button variant="link" class="icon-trash-fill" v-if="userId == $store.state.userId || $store.state.status == 0" @click="delPost">
                                        <b-icon icon="trash-fill" variant="secondary" font-scale="1"></b-icon>
                                    </b-button>
                                    <b-icon v-if="index == 2" icon="three-dots-vertical" variant="danger" animation="cylon-vertical" font-scale="1"></b-icon>
                                    <b-icon v-if="index == 1" icon="three-dots-vertical" variant="primary" animation="cylon-vertical" font-scale="1"></b-icon>
                                    <b-icon v-if="index == 0" icon="three-dots-vertical" variant="secondary" animation="cylon-vertical" font-scale="1"></b-icon>
                                </div>
                            </b-card-body>
                        </b-col>
                    </b-row>
                    <transition name="slide">
                        <div v-show="!show">
                            <div class="comment-form">
                                <b-row>
                                    <b-form inline>
                                        <div>
                                            <label class="sr-only" for="inline-form-input-name"></label>
                                            <b-form-input v-model="comment" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Votre commentaire ..."></b-form-input>
                                        </div>
                                    </b-form>
                                    <b-button variant="light" @click="commentPost(id)">
                                        <b-icon icon="hand-index-thumb" font-scale="3" class="mb-2 mr-sm-2 mb-sm-0"></b-icon>
                                    </b-button>
                                </b-row>
                            </div>
                            <b-row class="allcomments">
                                <b-col>
                                    <div class="my-4 comments-others" v-for="item in filterBy($store.state.commentsCont, item => item.commentPictureId == id).slice().reverse()" :key="item.id">
                                        <div id="comment">
                                            <div id="comment__avatar-date">
                                                <b-avatar id="comment__avatar-date--avatar" class="mr-3" :text="item.commentAvatarText"></b-avatar>
                                                <h6 id="comment__avatar-date--date">{{ item.commentDate | moment("from") }}</h6>
                                            </div>
                                            <div id="comment__comment">
                                                <p>
                                                    {{ item.comment }}
                                                </p>
                                            </div>
                                        </div>
                                        <b-button variant="link" v-if="item.commentUserId == $store.state.userId || $store.state.status == 0" @click="delComment(item.id)">
                                            <b-icon id="comment__icon" icon="trash-fill" variant="primary" scale="1"></b-icon>
                                        </b-button>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </transition>
                </div>
            </b-card>
        </template>
    </b-carousel-slide>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

const moment = require('moment')
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
    moment
})

export default {
    name: "SectionImg",
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            comment: null,
            show: true,
            testLike: null
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        avatarText: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        comments: {
            type: Number,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        likeStatus: {
            type: Boolean,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        usersLiked: {
            type: Array,
            required: true
        }
    },
    beforeCreate() {
        axios.get("http://localhost:3000/api/comments/", {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.token
                }
            })
            .then(comments => {
                localStorage.setItem("commentsDatas", JSON.stringify(comments.data));
                this.$store.state.commentsCont = JSON.parse(localStorage.getItem("commentsDatas"));

            })
            .catch(error => {
                console.log("Erreur lors du chargement des commentaires !!!")
                console.log(error)
                this.$store.state.token = null;
            });
    },
    mounted() {
        this.$store.state.likesCont = JSON.parse(localStorage.getItem("likesCont"));

        for (let item of this.$store.state.likesCont) {
            if (item.likedPictureId == this.id && item.likedUserId == this.$store.state.userId) {
                this.testLike = true;
            } else {
                this.testLike = false;
            }
        }
    },
    methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        },
        //***** modification like *****/        
        likePost(id, userId) {
            const content = {
                pictureUserId: userId,
                userId: this.$store.state.userId,
            };
            axios
                .post(
                    "http://localhost:3000/api/pictures/" + id + "/like", content, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token
                        }
                    }
                )
                .then(response => {
                    localStorage.setItem("likesCont", JSON.stringify(response.data));
                    this.$store.state.likesCont = JSON.parse(localStorage.getItem("likesCont"));

                    for (let item of this.$store.state.likesCont) {
                        if (item.likedPictureId == this.id && item.likedUserId == this.$store.state.userId) {
                            this.testLike = true;
                        } else {
                            this.testLike = false;
                        }
                    }

                    axios.get("http://localhost:3000/api/pictures/", {
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.state.token
                            }
                        })
                        .then(pictures => {
                            localStorage.setItem("picturesDatas", JSON.stringify(pictures.data));
                            this.$store.state.pictures = JSON.parse(localStorage.getItem("picturesDatas"));

                            axios.get("http://localhost:3000/api/auth/", {
                                    headers: {
                                        'Authorization': 'Bearer ' + this.$store.state.token
                                    }
                                })
                                .then(users => {
                                    localStorage.setItem("users", JSON.stringify(users.data));
                                    this.$store.state.users = JSON.parse(localStorage.getItem("users"));
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        })
                        .catch(error => {
                            console.log("Erreur lors du chargement des images !!!")
                            console.log(error)
                            this.$store.state.token = null;
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //***** suppression post *****//
        delPost() {
            if (confirm("Vous confirmez la suppression du post ?")) {

                axios
                    .delete("http://localhost:3000/api/comments/manyone/" + this.id + "/" + this.$store.state.userId, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token
                        }
                    })
                    .then(() => {
                        axios
                            .delete(
                                "http://localhost:3000/api/pictures/single/" + this.id + "/" + this.$store.state.userId, {
                                    headers: {
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
                                        alert("Post supprimé !!!")
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        //***** création commentaire *****//
        commentPost(id) {
            const content = {
                commentPictureId: id,
                comment: this.comment,
                commentUserId: this.$store.state.userId,
                userId: this.$store.state.userId,
                commentAvatarText: this.$store.state.firstName.charAt(0).toUpperCase() + this.$store.state.lastName.charAt(0).toUpperCase()
            };

            axios.post('http://localhost:3000/api/comments/',
                    content, {
                        headers: {
                            'Authorization': 'Bearer ' + this.$store.state.token
                        }
                    }
                )
                .then(response => {
                    console.log(response);
                    axios.get("http://localhost:3000/api/comments/", {
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.state.token
                            }
                        })
                        .then(comments => {
                            localStorage.setItem("commentsDatas", JSON.stringify(comments.data));
                            this.$store.state.commentsCont = JSON.parse(localStorage.getItem("commentsDatas"));

                            this.$store.state.comments += 1;
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
                                comments: this.$store.state.comments
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
                                            this.$store.state.users.comments += 1;
                                            const content = {
                                                comments: this.comments + 1,
                                            }
                                            axios
                                                .put(
                                                    "http://localhost:3000/api/pictures/" + this.id, content, {
                                                        headers: {
                                                            'Authorization': 'Bearer ' + this.$store.state.token
                                                        }
                                                    }
                                                )
                                                .then(response => {
                                                    console.log(response);
                                                    this.comments += 1;

                                                    setTimeout(() => {
                                                        axios.get("http://localhost:3000/api/pictures/", {
                                                                headers: {
                                                                    'Authorization': 'Bearer ' + this.$store.state.token
                                                                }
                                                            })
                                                            .then(pictures => {
                                                                console.log(pictures.data);
                                                                localStorage.setItem("picturesDatas", JSON.stringify(pictures.data));
                                                                this.$store.state.pictures = JSON.parse(localStorage.getItem("picturesDatas"));
                                                            })
                                                            .catch(error => {
                                                                console.log("Erreur lors du chargement des images !!!")
                                                                console.log(error)
                                                                this.$store.state.token = null;
                                                            });
                                                    }, 2000);

                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                });
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        });

                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });

                })
                .catch(error => {
                    console.log(error);
                });
        },
        //***** suppression commentaire *****//
        delComment(id) {
            if (confirm("Vous confirmez la suppression du commentaire ?")) {
                axios
                    .delete(
                        "http://localhost:3000/api/comments/single/" + id + "/" + this.$store.state.userId, {
                            headers: {
                                'Authorization': 'Bearer ' + this.$store.state.token
                            }
                        }
                    )
                    .then(response => {
                        console.log(response);
                        axios.get("http://localhost:3000/api/comments/", {
                                headers: {
                                    'Authorization': 'Bearer ' + this.$store.state.token
                                }
                            })
                            .then(comments => {
                                localStorage.setItem("commentsDatas", JSON.stringify(comments.data));
                                this.$store.state.commentsCont = JSON.parse(localStorage.getItem("commentsDatas"));
                                alert("commentaire supprimé !!!")

                                const content = {
                                    comments: this.comments - 1,
                                }
                                axios
                                    .put(
                                        "http://localhost:3000/api/pictures/" + this.id, content, {
                                            headers: {
                                                'Authorization': 'Bearer ' + this.$store.state.token
                                            }
                                        }
                                    )
                                    .then(response => {
                                        console.log(response);
                                        this.comments -= 1;
                                        setTimeout(() => {
                                            axios.get("http://localhost:3000/api/pictures/", {
                                                    headers: {
                                                        'Authorization': 'Bearer ' + this.$store.state.token
                                                    }
                                                })
                                                .then(pictures => {
                                                    console.log(pictures.data);
                                                    localStorage.setItem("picturesDatas", JSON.stringify(pictures.data));
                                                    this.$store.state.pictures = JSON.parse(localStorage.getItem("picturesDatas"));
                                                })
                                                .catch(error => {
                                                    console.log("Erreur lors du chargement des images !!!")
                                                    console.log(error)
                                                    this.$store.state.token = null;
                                                });
                                        }, 4000);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    })
                    .catch(error => console.log(error));
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.card {
    margin: 10px auto;
}

.card-date,
.card-like {
    font-size: 12px;
}

.card-name {
    font-size: 14px;
    background-color: #b3b3b3;
}

.card-score {
    font-size: 1rem;
    color: #cc0000;
}

.like-block {
    display: flex;
    justify-content: space-between;
}

.icon-like {
    font-size: 2rem;
}

.icon-trash {
    font-size: 1.5rem;
}

.card-like {
    font-size: 2rem;
    margin: 12px 0 10px;
}

.hand-thumbs-up-score {
    display: flex;
    justify-content: space-around;
    margin: 0px;
}

.comment-form {
    margin: 20px auto 10px;
    max-width: 90%;
}

#comment {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    &__avatar-date {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        margin-bottom: 10px;

        &--avatar {
            margin-right: 10px;
            font-size: 12px;
            background-color: #ffffff;
        }

        &--date {
            font-size: 0.8rem;
        }
    }

    &__icon {
        margin-right: 10px;
    }
}

.comments-others {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666666;
    border: 1px solid #504b4b;
    border-radius: 20px;
    padding: 10px;
    margin: 0 20px;
    background-color: #c8c8c8;
}

.allcomments {
    margin: auto;
}

.slide-enter-active {
    transition-duration: 400ms;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    transition-duration: 300ms;
    transition-timing-function: ease-out;
}

.slide-enter-to,
.slide-leave {
    max-height: 400px;
}

.slide-enter,
.slide-leave-to {
    max-height: 0;
}
</style>
