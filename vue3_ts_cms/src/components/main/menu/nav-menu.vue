<template>
    <div class="nav-menu">
        <div class="head">
            <img src="@/assets/img/logo.png" alt="" v-show="!isCollapse">
            <h5 class="title" v-show="!isCollapse">后台管理系统</h5>
        </div>
        <div class="inner-menu">
            <el-menu active-text-color="white" 
            background-color="#77ac53" 
            default-active="39" 
            class="el-menu-vertical-demo"
                text-color="rgb(36 101 55)" 
                :collapse="isCollapse">
                <template v-for="item in LoginMenu" :key="item.id">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon.split('-icon-')[1]"/>
                            </el-icon>
                            <span>{{ item.name }}
                            </span>
                        </template>
                        <template v-for="items in item.children" :key="items.id">
                            <el-menu-item :index="items.id +''" @click="ChangeRoute(items)">
                                <span>{{ items.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
            </el-menu>
        </div>
    </div>
</template>


<script setup lang="ts">
import useLoginStore from '@/store/login/index'
import { useRouter } from 'vue-router';
const LoginStore = useLoginStore()
const LoginMenu = LoginStore.userMenu;
defineProps({
    isCollapse:{
        type:Boolean,
        default:false
    }
}) 
const router=useRouter()
const ChangeRoute=function(item:any){
    //console.log(111)
    router.push(item.url)
}
</script>



<style lang="less" scoped>
.nav-menu {
    color: black;

    .head {
        display: flex;
        height: 45px;
        padding: 12px 10px 8px 10px;
        flex-direction: row;
        justify-content: flex-start;
        align-item: centent;
        over-flow: hidden;

        img {
            height: 100%;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
            black-space: nowrap;
        }
    }
}
</style>
