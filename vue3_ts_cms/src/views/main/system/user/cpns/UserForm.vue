<template>
  <div class="form">
    <el-dialog v-model="dialogFormVisible" :title="showPrd? '新建用户':'修改用户'">
      <el-form :model="form">

        <el-form-item label="姓名" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="真实姓名" label-width="80px" prop="realname">
          <el-input v-model="form.realname" autocomplete="off" />
        </el-form-item>

        <el-form-item v-if="showPrd" label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"  show-password/>
        </el-form-item>


        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.cellphone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择角色" label-width="80px" prop="roleId">
          <el-select v-model="form.roleId" placeholder="选择角色" style="width:100%">
            <template v-for="item in RoleList">
              <el-option :label=item.name :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" label-width="80px" prop="departmentId">
          <el-select v-model="form.departmentId" placeholder="选择部门" style="width:100%">
            <template v-for="item in DepartmentList">
              <el-option :label=item.name :value="item.id" />
            </template>
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleFormData">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import useMainStore from '@/store/main/main';
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/main/system';



const dialogFormVisible = ref(false)
const showPrd=ref(false)
const remId=ref()
const MainStore = useMainStore()
const userStore=useUserStore()
const { RoleList, DepartmentList } = storeToRefs(MainStore);
const form = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
function handleFormData(){
  dialogFormVisible.value = false;
  if(showPrd.value==true)
  {
    //新建
    userStore.createUserAction(form)
  }else{
    userStore.updateUserAction(remId.value,form)
  }
  
}
function setDialogFormVisible(isNew:boolean=true,formData?:any){
  showPrd.value=isNew;
  if(!isNew&&formData)
  {
    //不为新增
    for(const key in form)
    {
      form[key]=formData[key];
    }
    remId.value=formData.id;
  }else{
     //新增
     for(const key in form)
    {
      form[key]='';
    }
    remId.value=null
  }

  dialogFormVisible.value = true;
}

defineExpose({ setDialogFormVisible })
</script>
<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
