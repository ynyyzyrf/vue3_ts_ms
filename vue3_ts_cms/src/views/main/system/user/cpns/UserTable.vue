<template>
  <div class="table">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <div class="button">
        <el-button type="primary" @click="createUserClick">新建用户</el-button>
        <el-button type="danger">删除用户</el-button>
      </div>
    </div>
    <div class="content">
      <el-table style="width: 100%" height="500" :data="userList">
        <el-table-column prop="address" type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="100" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="realname" label="真实姓名" width="150" />
        <el-table-column prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button plain :type="scope.row.enable ? 'primary' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="电话" width="200" />
        <el-table-column prop="createAt" label="入职时间" width="200">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" width="200">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleChangeClick(scope.row.id,scope.row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDeteleClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageChange">

        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          small="small" layout="total, sizes, prev, pager, next, jumper" :total="countTotal"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import useUserStore from '@/store/main/system/index';
import { storeToRefs } from 'pinia';
import { formatUTC } from '@/utils/format';
import { ref } from 'vue';
const currentPage = ref(1);
const pageSize = ref(10);
const userMessage = useUserStore()
//userMessage.postUserListAction()
getList();
const { userList, countTotal } = storeToRefs(userMessage)
const emit=defineEmits(['createClick','updateClick']);
//新建用户
function createUserClick(){
  emit('createClick')
}

//修改
function handleChangeClick(id:number,userInfo:any){
  emit('updateClick',userInfo);
}


//分页
function handleSizeChange() {
  console.log(111)
  getList();

}
function handleCurrentChange() {
  getList();
}
function handleDeteleClick(id:number){
userMessage.deleteUserListAction(id);

}
function getList(formData: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const Info = { size, offset }
  const queryInfo = { ...Info, ...formData }
  console.log(queryInfo)
  userMessage.postUserListAction(queryInfo)
}
defineExpose({ getList })
</script>



<style lang="less" scoped>
.table {
  padding: 2px;
  margin-top: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 20px;

    .title {
      font-size: 22px;
    }
  }

  .pageChange {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
@/store/main/system/index