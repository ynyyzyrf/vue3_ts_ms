<template>
    <div class="login_panel">
        <div class="title">
            <h1>后台管理系统</h1>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号登录" name="first">
                    <template #label>
                        <div class="acc">
                            <span class="text">账号登录</span>
                        </div>
                    </template>
                    <panel-account ref="accountRef" />
                </el-tab-pane>
                <el-tab-pane label="手机登录" name="second">
                    <panel-phone />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="option">
            <el-checkbox v-model="checked" label="记住密码" size="large" />
            <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>
        <el-button class="login-btn" type="primary" size="large" @click="LoginActive">立即登录</el-button>




    </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import panelPhone from "./panel-phone.vue";
import panelAccount from "./panel_account.vue"
import { localCache } from "@/utils/cache";
const checked = ref<boolean>(localCache.getCache('checked') ?? false)
watch(checked, (newValue) => {
    localCache.setCache('checked', newValue)
})
const activeName = ref('first')
const accountRef = ref<InstanceType<typeof panelAccount>>()
const LoginActive = function () {
    if (activeName.value == 'first') {
        console.log('账号登录！');
        accountRef.value?.clickLogin(checked.value);


    } else {
        console.log('手机登录！')
    }

}
</script>



<style lang="less" scoped>
.login_panel {
    width: 350px;
    background-color: white;
    margin-bottom: 150px;

    .tabs {
        margin-left: 15px;
        margin-right: 15px;


    }

    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .option {
        display: flex;
        justify-content: space-between;
        margin: 12px;

    }

    .login-btn {
        margin-top: 5px;
        width: 100%;
        margin-bottom: 5px;


    }
}
</style>
