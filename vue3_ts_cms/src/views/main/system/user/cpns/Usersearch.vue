<template>
  <div class="search">
    <el-form  :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="Approved by" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="Approved by" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="Approved by" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="please select your zone" v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁止" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期" prop="createAt">
            <el-date-picker  v-model="searchForm.createAt" type="daterange" unlink-panels range-separator="To" start-placeholder="Start date"
              end-placeholder="End date" size="large" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary"  @click="handleSearchClick">查询</el-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

const emit=defineEmits(['handleClick','resetClick']);
const searchForm=reactive({
  name:'',
  realname:'',
  cellphone:'',
  enable:'',
  createAt:''
})
//重置操作
const formRef=ref<InstanceType<typeof ElForm>>();

function handleResetClick(){
  formRef.value?.resetFields();
  emit('resetClick',searchForm)
}
function handleSearchClick(){
  emit('handleClick',searchForm);
}
</script>



<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
