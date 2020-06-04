import Vue from 'vue'
import VueRouter from 'vue-router'
import TotalClientTable from "../components/TotalClientTable";
import Auth from '../pages/Auth.vue'

Vue.use(VueRouter)

const routes = [
    {path: '/', component: TotalClientTable},
    {path: '/login', component: Auth},
    {path: '*', component: Auth},

]

export default new VueRouter({
    mode: 'history',
    routes
})
