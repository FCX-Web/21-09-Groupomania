<template>
<!--Navigation bar-->
<b-container class="bv-example-row">
    <b-navbar id="navbar" type="dark">
        <b-navbar-nav id="nav">
            <!--Navbar first element-->
            <b-nav-item href="index.html">Accueil</b-nav-item>
            <!--Profil button-->
            <b-button id="popover-target-1" class="button" pill>
                Profil
            </b-button>
            <b-popover target="popover-target-1" triggers="hover">
                <template #title>{{ $store.state.firstName }} {{ $store.state.lastName }}</template>
                <NavProfil>
                    <template v-slot:posts>
                        {{ $store.state.posts }}
                    </template>
                    <template v-slot:comments>
                        {{ $store.state.comments }}
                    </template>
                    <template v-slot:likes>
                        {{ $store.state.likes }}
                    </template>
                </NavProfil>
                <NavProfilDelete />
            </b-popover>
            <!--Post button-->
            <b-button class="button" pill v-b-modal.modal-lg>POST</b-button>
            <b-modal id="modal-lg" size="lg" title="" hide-header-close>
                <NavPost />
            </b-modal>
            <!--Top button-->
            <b-button class="button" pill v-b-toggle.sidebar-top :key="likes">TOP</b-button>
            <b-sidebar id="sidebar-top" no-header bg-variant="secondary" text-variant="light" shadow width="400px" backdrop>
                <div class="px-3 py-2">
                    <div class="aside-top">
                        <b-list-group>
                            <div id="members">{{ this.$store.state.users.length }} membre(s) 9GM</div>
                            <b-list-group-item class="aside-top__group--margin" :key="this.$store.state.users">
                                <NavTop v-for="(item, index) in orderBy(this.$store.state.users, 'likes', -1)" :key="index" :userId="item.userId" :status="item.status">
                                    <template v-slot:classification>
                                        {{ index + 1 }}
                                    </template>
                                    <template v-slot:firstName>
                                        {{ item.firstName }}
                                    </template>
                                    <template v-slot:lastName>
                                        {{ item.lastName }}
                                    </template>
                                    <template v-slot:likes>
                                        {{ item.likes }}
                                    </template>
                                </NavTop>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </b-sidebar>
            <!--Classification-->
            <div v-for="(item, index) in orderBy(this.$store.state.users, 'likes', -1)" :key="index">
                <div v-if="$store.state.userId == item.userId" id="indicator">
                    {{ index + 1 }}
                </div>
            </div>
        </b-navbar-nav>
    </b-navbar>
</b-container>
</template>

<script>
import NavProfil from "./NavProfil.vue"
import NavProfilDelete from "./NavProfilDelete.vue"
import NavPost from "./NavPost.vue"
import NavTop from "./NavTop.vue"
import {
    mapState
} from 'vuex'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import axios from 'axios'

Vue.use(Vue2Filters)

export default {
    name: 'Nav',
    components: {
        NavProfil,
        NavProfilDelete,
        NavPost,
        NavTop
    },
    computed: {
        ...mapState(['users']),
        storeIndex() {
            let myClassification = this.genClassification
            return myClassification
        }
    },
    mixins: [Vue2Filters.mixin],
    methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        }
    },
    beforeCreate() {
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
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h2 {
    font-size: 1.2rem;
}

#members {
    padding-bottom: 10px;
    font-size: 20px;
    font-style: italic;
    font-weight: bold;
}

.tooltip-inner {
    width: 600px;
}

#navbar {
    background-color: #264d73;
}

#nav {
    align-items: center;
}

.button {
    margin: 0 10px;
    padding: 0 15px;
    background-color: #b3b3b3;
    color: #003366;
    font-weight: bold;
}

#nav__user {
    color: #ffffff;
    font-weight: bold;
    margin: 0 10px;
}

.aside-top {
    margin: 20px 0;
}

#indicator {
    margin: 0 10px;
    padding: 0 15px;
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #ff8080;
    border-radius: 25px;
}

@media screen and (max-width: 499px) {
    #nav {
        flex-direction: column;
        align-items: flex-start;
    }

    .button {
        margin: 10px;
    }
}
</style>
