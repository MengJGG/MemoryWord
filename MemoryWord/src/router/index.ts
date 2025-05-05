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
        path: '/Test',
        name: 'Test',
        component: () => import('@/views/Test.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router