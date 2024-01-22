import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/users/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')
    },

    {
        path: '/users/singin',
        name: 'singin',
        component: () =>
            import ('../views/singin.vue')
    },

    {
        path: '/users/trangchu',
        name: 'trangchu',
        component: () =>
            import ('../views/trangchu.vue')
    },

    {
        path: '/admin/index',
        name: 'index',
        component: () =>
            import ('../views/indexAdmin.vue')
    },


    {
        path: '/menuAdmin/indexMenu',
        name: 'indexMenu',
        component: () =>
            import ('../views/indexMenu.vue')
    },

    {
        path: '/admin/search',
        name: 'search',
        component: () =>
            import ('../views/search.vue')
    },

    {
        path: '/admin/Products',
        name: 'Products',
        component: () =>
            import ('../views/Products.vue')
    },

    {
        path: '/admin/test',
        name: 'test',
        component: () =>
            import ('../views/test.vue')
    },

    {
        path: '/users/TopBar',
        name: 'TopBar',
        component: () =>
            import ('../views/TopBar.vue')
    },

    {
        path: '/users/productdetail',
        name: 'productdetail',
        component: () =>
            import ('../views/productdetail.vue')
    },

    {
        path: '/users/FooterBar',
        name: 'FooterBar',
        component: () =>
            import ('../views/FooterBar.vue')
    },

    {
        path: '/users/index',
        name: 'index',
        component: () =>
            import ('../views/indexUsers.vue')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router