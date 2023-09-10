import { getEntireDepartment, getEntireRoles } from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainState{
    RoleList:any[],
    DepartmentList:any[],
}
const useMainStore=defineStore('main',{
    state:():IMainState=>({
        RoleList:[],
        DepartmentList:[],
    }),
    actions:{
        async fetchEntireDataAction(){
                const getRole=await getEntireRoles();
                this.RoleList=getRole.data.list;
                const getDepartment=await getEntireDepartment();
                this.DepartmentList=getDepartment.data.list;
                console.log(getRole,getDepartment)


        }
    }

})
export default useMainStore;