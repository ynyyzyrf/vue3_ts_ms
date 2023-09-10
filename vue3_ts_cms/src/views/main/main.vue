<template>
    <div class="main">
        <el-container class="main-container">
            <el-aside :width="isCollapse ? '60px' : '200px'">
                <Navmenu :is-Collapse="isCollapse"/>
            </el-aside>
            <el-container>
                <el-header >
                    <Navheader @fold-change="changeFoldStatus(isCollapse)"/>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>


    </div>
    <!--<div class="other">
        <h2>我是主页面</h2>
        <button @click="exitLogin()">退出登录</button>
    </div>-->
</template>


<script setup lang="ts">
import Navmenu from '@/components/main/menu/nav-menu.vue'
import Navheader from '@/components/main/header/nav-header.vue'
import { ref } from 'vue';
const isCollapse = ref(false)
function changeFoldStatus(isFlag: boolean) {
    isCollapse.value = !isFlag;
}
/*
const exitLogin = function () {
    localCache.removeCache(LOGIN_TOKEN);
    router.back()
}*/
</script>



<style lang="less" scoped>
.main {
    height: 100%;
    width: 100% //background-color: rgb(118, 214, 118);
}

.main-container {
    height: 100%;

    .el-aside {
        background-color: #77ac53;
        transition: width 0.2s ease;
    }

    .el-header {
        background-color: white
    }

    .el-main {
        background-color: #f0f2f5;
    }
}
</style>
