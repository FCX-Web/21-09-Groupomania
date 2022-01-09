<template>
<div class="accordion" role="tablist">
    <div v-for="(cat, index) in categories" :key="index">
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button id="carousel__button" block v-b-toggle="'accordion-' + index">{{ cat.catName }}</b-button>
            </b-card-header>
            <b-collapse :id="'accordion-' + index" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <b-card-text>
                        <b-carousel fade id="'carousel-' + index" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;">
                            <!--- Premier onglet ************************************************* -->
                            <div v-if="index == 0">
                                <SectionImg v-for="item in filterBy($store.state.pictures, item => item.likes >= categories[0].lowerBoundary).slice().reverse()" :id="item.id" :index="index" :imageUrl="item.imageUrl" :title="item.title" :userId="item.userId" :avatarText="item.avatarText" :date="item.date" :comments="item.comments" :likes="item.likes" :likeStatus="item.likeStatus" :usersLiked="item.usersLiked" :key="item._id" />
                            </div>
                            <!--- Deuxième onglet ************************************************* -->
                            <div v-if="index == 1">
                                <SectionImg v-for="item in filterBy($store.state.pictures, item => item.likes >= categories[1].lowerBoundary && item.likes < categories[0].lowerBoundary).slice().reverse()" :id="item.id" :index="index" :imageUrl="item.imageUrl" :title="item.title" :userId="item.userId" :avatarText="item.avatarText" :date="item.date" :comments="item.comments" :likes="item.likes" :likeStatus="item.likeStatus" :usersLiked="item.usersLiked" :key="item._id" />
                            </div>
                            <!--- Troisième onglet ************************************************* -->
                            <div v-if="index == 2">
                                <SectionImg v-for="item in filterBy($store.state.pictures, item => item.likes < categories[1].lowerBoundary).slice().reverse()" :id="item.id" :index="index" :imageUrl="item.imageUrl" :title="item.title" :userId="item.userId" :avatarText="item.avatarText" :date="item.date" :comments="item.comments" :likes="item.likes" :likeStatus="item.likeStatus" :usersLiked="item.usersLiked" :key="item._id" />
                            </div>
                        </b-carousel>
                    </b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</div>
</template>

<script>
import SectionImg from "./SectionImg.vue"
import {
    mapState
} from 'vuex'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import axios from "axios"

Vue.use(Vue2Filters)

export default {
    name: 'Section',
    components: {
        SectionImg
    },
    methods: {
        sendisloggedin() {
            this.$store.dispatch('isloggedin')
        }
    },
    mixins: [Vue2Filters.mixin],
    data() {
        return {
            pictures: []
        }
    },
    computed: {
        ...mapState(['categories'])
    },
    beforeCreate() {
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
#carousel__button {
    background-color: #264d73;
    font-style: italic;
    letter-spacing: 2px;
}
</style>
