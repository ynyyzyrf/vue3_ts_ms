import hyRequest from "@/service";
export function getUserForm(queryInfo:any) {
    return hyRequest.post({
        url: '/users/list',
        data: queryInfo
    })
   
}
export function deleteUserForm(id:number) {
    return hyRequest.delete({
        url:`/users/${id}`
        
    })
}
export function createUserData(userInfo:any){
    return hyRequest.post({
        url:'/users',
        data:userInfo
    })
}
export function updateUserData(id:number,userInfo:any){
    return hyRequest.patch({
        url:`/users/${id}`,
        data:userInfo
    })
}
