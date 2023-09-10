<template>
  <div class="nav-header">
    <div class="openMenu" @click="changeFoldStatus">
      <el-icon>
        <component :is="isCollapse==true ? 'Fold':'Expand'" />
      </el-icon>
    </div>

    <div class="content">
      <div class="bread">
        <BreadCrumb/>
      </div>
      <div class="info">
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exitLogin()">退出系统</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>


  </div>
</template>


<script setup lang="ts">
import { localCache } from "@/utils/cache";
import { ref } from 'vue'
import router from "@/router";
import { LOGIN_TOKEN } from "@/global/constants";
import BreadCrumb from '../header/cpns/breadCrumb.vue'
const isCollapse = ref(false)
//自定义内部事件
const emit = defineEmits(['foldChange'])
function changeFoldStatus() {
  isCollapse.value = !isCollapse.value
  emit('foldChange', isCollapse.value)
  console.log('发出')
}

const exitLogin = function () {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>



<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .openMenu {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;

  }
}
</style>
