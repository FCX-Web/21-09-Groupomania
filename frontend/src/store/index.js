import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firstName: null,
        lastName: null,
        status: null,
        likes: null,
        comments: null,
        posts: null,
        userId: null,

        token: null,

        pictures: null,
        users: null,
        commentsCont: null,
        likesCont: null,

        plugins: [createPersistedState()],
        categories: [{
                catName: "Populaires",
                lowerBoundary: 100,
            },
            {
                catName: "Tendances",
                lowerBoundary: 50,
            },
            {
                catName: "Ils vont vous plaire ...",
                lowerBoundary: 0,
            }
        ],
    },
    mutations: {
        ISLOGGED_IN(state) {
            state.token = JSON.parse(localStorage.getItem("userDatas")).token,
                state.firstName = JSON.parse(localStorage.getItem("userDatas")).firstName,
                state.lastName = JSON.parse(localStorage.getItem("userDatas")).lastName,
                state.status = JSON.parse(localStorage.getItem("userDatas")).status,
                state.likes = JSON.parse(localStorage.getItem("userDatas")).likes,
                state.comments = JSON.parse(localStorage.getItem("userDatas")).comments,
                state.posts = JSON.parse(localStorage.getItem("userDatas")).posts,
                state.userId = JSON.parse(localStorage.getItem("userDatas")).userId,
                state.pictures = JSON.parse(localStorage.getItem("picturesDatas")),
                state.users = JSON.parse(localStorage.getItem("users")),
                state.commentsCont = JSON.parse(localStorage.getItem("commentsDatas")),
                state.likesCont = JSON.parse(localStorage.getItem("likesCont"))
        },
        ISLOGGED_OUT(state) {
            state.token = null,
                state.firstName = null,
                state.lastName = null,
                state.status = null,
                state.likes = null,
                state.comments = null,
                state.posts = null,
                state.userId = null,
                localStorage.setItem("userDatas", null),
                localStorage.setItem("picturesDatas", null),
                localStorage.setItem("users", null),
                localStorage.setItem("commentsDatas", null),
                localStorage.setItem("likesCont", null)
        }
    },
    actions: {
        isloggedin(context) {
            context.commit('ISLOGGED_IN')
        },
        isloggedout(context) {
            context.commit('ISLOGGED_OUT')
        }
    }
})