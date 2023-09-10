//import router from "@/router"
import type { RouteRecordRaw } from "vue-router"

export function mapMenusToRoutes(userMenu: any[]) {
    //动态匹配菜单
    const localRoute: RouteRecordRaw[] = []
    //读取router/main里的所有文件
    const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
        eager: true
    })
    //console.log(files)
    for (const key in files) {
        const module = files[key]
        //console.log(module.default)
        localRoute.push(module.default)
    }
    const routes: RouteRecordRaw[] = []
    for (const menu of userMenu) {
        for (const subitem of menu.children) {
            const route = localRoute.find((item) => item.path === subitem.url)
            if (route) {
                routes.push({path:menu.url,redirect:route})
                routes.push(route)
        }}
    }
    return routes;
}
interface BCrump {
    name: string,
    path: string
}
export function mapInBreadCrump(path: string, userMenu: any[]) {
    const breadInCrump: BCrump[] = []
    for (const item of userMenu) {
        for (const subitem of item.children) {
            if (subitem.url === path) {
                breadInCrump.push({ name: item.name, path: item.url })
                breadInCrump.push({ name: subitem.name, path: subitem.url })
            }

        }
    }
    return breadInCrump;
}