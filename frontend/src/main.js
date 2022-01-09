import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { BootstrapVue, IconsPlugin, BootstrapVueIcons, AvatarPlugin, ModalPlugin, ButtonPlugin, NavbarPlugin, PopoverPlugin, NavPlugin, SidebarPlugin, ListGroupPlugin, FormInputPlugin, FormFilePlugin, BadgePlugin, CardPlugin, CarouselPlugin, CollapsePlugin, BSidebar, BCarousel } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(AvatarPlugin)
Vue.use(ModalPlugin)
Vue.use(ButtonPlugin)
Vue.use(NavbarPlugin)
Vue.use(PopoverPlugin)
Vue.use(NavPlugin)
Vue.use(SidebarPlugin)
Vue.use(ListGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormFilePlugin)
Vue.use(BadgePlugin)
Vue.use(CardPlugin)
Vue.use(CarouselPlugin)
Vue.use(CollapsePlugin)
Vue.config.productionTip = false
Vue.component('b-sidebar', BSidebar)
Vue.component('b-carousel', BCarousel)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')