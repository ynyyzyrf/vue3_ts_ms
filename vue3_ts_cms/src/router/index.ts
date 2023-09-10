import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/login',
            component: () => import('../views/login/login.vue')
        },
        {
            path: '/main',
            name:'main',
            component: () => import('../views/main/main.vue'),
            
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('../views/not-found/not-found.vue')
        }
    ]
})
//路由导航守卫
router.beforeEach((to) => {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (to.path.startsWith('/main') && !token) {
        return '/login'
    }
    if (to.path==='/main') {
        return '/main/analysis/overview'
    }
})
/*const localRoute=[
    {
        path: '/main/analysis/overview',
        component: () => import('../views/main/analysis/overview/overview.vue')
    },
    {
        path: '/main/analysis/dashboard',
        component: () => import('../views/main/analysis/dashboard/dashboard.vue')
    },
    {
        path: '/main/system/user',
        component: () => import('../views/main/system/user/user.vue')
    },
    {
        path: '/main/system/role',
        component: () => import('../views/main/system/role/role.vue')
    }

]
router.addRoute('main',localRoute[0])
router.addRoute('main',localRoute[1])
router.addRoute('main',localRoute[2])
router.addRoute('main',localRoute[3])*/

export default router;