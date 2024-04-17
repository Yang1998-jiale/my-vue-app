/*
 * @Author: yjl
 * @Date: 2023-10-16 10:30:39
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-17 16:39:15
 * @Description: 描述
 */
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import type { App } from 'vue'
const defaultRouter = [
    {
        path: '/',
        redirect: '/home'
    },
]
export const routerPath = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
            label: '首页'
        }
    },
    {
        path: '/three',
        name: 'three',
        component: () => import('@/views/three.vue'),
        meta: {
            label: 'three页面'
        }
    },
    {
        path: '/Three3D',
        name: 'Three3D',
        component: () => import('@/views/three3D.vue'),
        meta: {
            label: 'three3D'
        }
    },
    {
        path: '/proxy',
        name: 'proxy',
        component: () => import('@/views/proxy.vue'),
        meta: {
            label: 'proxy页面'
        }
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...defaultRouter,
        ...routerPath
    ]
})

export function superApp(app: App<Element>) {
    app.use(router)
}