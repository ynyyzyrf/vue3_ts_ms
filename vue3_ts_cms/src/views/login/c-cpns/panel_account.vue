<template>
    <div class="panelAccount">
        <el-form label-width="80px" :model="account" :rules="rules" status-icon ref="formRef">
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name" placeholder="请输入账号" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="account.password" placeholder="请输入密码" />
            </el-form-item>
        </el-form>

    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormRules, ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import useLoginStore from "../../../store/login/index"
import type { RuleForm } from '@/types/login'
import { localCache } from "@/utils/cache";
const account = reactive<RuleForm>({
    name: localCache.getCache('name') ?? '',
    password: localCache.getCache('password') ?? ''
})


const rules = reactive<FormRules<RuleForm>>({
    name: [{
        required: true,
        message: '请输入账号',
        trigger: 'blur',
    },
    {
        min: 5, max: 10,
        message: 'Length should be 5 to 10',
        trigger: 'blur'
    },],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur',
    },
    {
        min: 6,
        message: 'Length should be 6 at least',
        trigger: 'blur'
    },]
})
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore()
const clickLogin = function (checked: boolean) {
    formRef.value?.validate((valid) => {
        if (valid) {
            // console.log('验证成功');
            //获取账号密码
            const name = account.name;
            const password = account.password;
            loginStore.loginAccountAction({ name, password }).then((res) => {
                if (checked) {
                    localCache.setCache("name", name)
                    localCache.setCache("password", password)
                } else{
                    localCache.removeCache('name');
                    localCache.removeCache('password');

                }
            })
        } else {
            ElMessage.error('账号密码不符合规则，请重新输入')
        }

    })
}

defineExpose({
    clickLogin
})
</script>



<style lang="less" scoped></style>
