import { deleteUserForm, getUserForm,createUserData, updateUserData } from "@/service/main/system";
import { defineStore } from "pinia";

interface IsystemState{
    userList:IuserList[],
    countTotal:number
}
interface IuserList {
    id: number
    name: string
    realname: string
    cellphone: number
    enable: number
    departmentId: number
    roleId: number
    createAt: string
    updateAt: string
  }
  
const useUserStore=defineStore('user',{
    state:():IsystemState =>({
        userList:[],
        countTotal:0
    }),
    actions:{
        async postUserListAction(queryInfo:any) {
            const allUserList=await getUserForm(queryInfo)
            const {totalCount,list}=allUserList.data
            this.userList=list
            this.countTotal=totalCount
            console.log(this.userList)
        },
        async deleteUserListAction(id:number){
            const deleteList=await deleteUserForm(id);
            this.postUserListAction({offset:0,size:10});
            
        },
        async createUserAction(userInfo:any){
            const createResult=await createUserData(userInfo);
            this.postUserListAction({offset:0,size:10});
            //console.log(createResult)        
        },
        async updateUserAction(id:number,userInfo:any){
            const updateResult=await updateUserData(id,userInfo);
            this.postUserListAction({offset:0,size:10});
        }

        
    }
})
export default useUserStore;