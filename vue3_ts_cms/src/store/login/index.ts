import { accountLoginRequest, getMenuTreeByRole, getUserRoleByid } from "@/service/login";
import { defineStore } from "pinia";
import type { RuleForm } from '@/types/login'
import { localCache } from "@/utils/cache";
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import { mapMenusToRoutes } from "@/utils/map-menu";
import useMainStore from '@/store/main/main';

interface stateType {
    token: string,
    userInfo: any,
    userMenu: any
}
const useLoginStore = defineStore('login', {
    state: (): stateType => ({
        token: '',
        userInfo: {},
        userMenu: []
    }),
    actions: {
        async loginAccountAction(account: RuleForm) {
            const loginResult = await accountLoginRequest(account)
            const id = loginResult.data.id;
            const name = loginResult.data.name;
            this.token = loginResult.data.token;
            //本地缓存token
            localCache.setCache(LOGIN_TOKEN, this.token)
            //  获取用户的角色信息
            const userInfoRes = await getUserRoleByid(id)
            this.userInfo = userInfoRes.data
            //console.log(this.userInfo)
            //获取用户菜单树
            const userMenuInfo = await getMenuTreeByRole(this.userInfo.role.id)
            this.userMenu = userMenuInfo.data
            //console.log(this.userMenu)
            //进行本地缓存
            localCache.setCache('userInfo', userInfoRes.data)
            localCache.setCache('userMenu', userMenuInfo.data)
            //请求表单数据
            const MianStore = useMainStore()
            MianStore.fetchEntireDataAction();
            //拿到动态路由
            const routes = mapMenusToRoutes(userMenuInfo.data)
            routes.forEach((route) => router.addRoute('main', route))
            //页面跳转
            router.push('/main')

        },
        loadStoreCache() {
            const token = localCache.getCache(LOGIN_TOKEN)
            const userInfo = localCache.getCache('userInfo')
            const userMenu = localCache.getCache('userMenu')
            if (token && userInfo && userMenu) {
                //拿到动态路由
                this.token = token;
                this.userInfo = userInfo;
                this.userMenu = userMenu;
                const MianStore = useMainStore()
                MianStore.fetchEntireDataAction();
                const routes = mapMenusToRoutes(userMenu)
                routes.forEach((route) => router.addRoute('main', route))
            }
        }
    }

})
export default useLoginStore