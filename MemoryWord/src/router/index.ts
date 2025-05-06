import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/learn',
        name: 'Learn',
        component: () => import('@/views/Learn.vue')
    },
    {
        path: '/option',
        name: 'Option',
        component: () => import('@/views/Option.vue')
    },
    {
        path: '/Memory',
        name: 'Memory',
        component: () => import('@/views/Memory.vue')
    },
    {
        path: '/Typing',
        name: 'Typing',
        component: () => import('@/views/Typing.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router