<template>
    <div class="user">
        <div class="search">
            <Usersearch @handle-click="handleQueryClick"
            @reset-click="handleResetClick" />
        </div>
        <div class="content">
            <UserTable ref="contentRef" @create-click="changeCreateForm"
            @update-click="openUpdateForm" />
            <UserForm ref="formRef"></UserForm>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Usersearch from '../user/cpns/Usersearch.vue'
import UserTable from '../user/cpns/UserTable.vue'
import UserForm from './cpns/UserForm.vue';
const contentRef = ref<InstanceType<typeof UserTable>>()
const formRef = ref<InstanceType<typeof UserForm>>()
function handleQueryClick(formData: any) {
    contentRef.value.getList(formData)
}
function handleResetClick(formData:any){
    contentRef.value.getList(formData)
}

function changeCreateForm(){
    formRef.value.setDialogFormVisible();
}
function openUpdateForm(userInfo:any){
    formRef.value.setDialogFormVisible(false,userInfo);
}

</script>



<style lang="less" scoped>
.user {
    .search {
        margin-bottom: 20px;
    }

}
</style>
