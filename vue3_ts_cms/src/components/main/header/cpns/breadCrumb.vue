<template>
  <div class="bread">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in bread" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>

    </el-breadcrumb>
  </div>
</template>


<script setup lang="ts">
import useLoginStore from '@/store/login/index'
import {mapInBreadCrump} from '@/utils/map-menu'
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const LoginStore = useLoginStore()
const menu = LoginStore.userMenu
const route=useRoute()
const bread=computed(()=>{
  return mapInBreadCrump(route.path,menu)
})

console.log(menu)
</script>



<style lang="less" scoped></style>
