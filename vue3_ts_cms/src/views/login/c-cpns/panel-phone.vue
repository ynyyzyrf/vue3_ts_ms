<template>
    <div class="panelPhone">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
            <el-form-item label="手机号" >
                <el-input v-model="phonenum" placeholder="请输入手机号" clearable />
            </el-form-item>
            <el-form-item >
                <template #label>
                    <el-button size="small">获取验证码</el-button>
                </template>
                <el-input v-model="phoneback" placeholder="请输入验证码" clearable />
            </el-form-item>
        </el-form>
        </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
const phonenum = ref();
const phoneback = ref();
</script>



<style lang="less" scoped>

</style>
