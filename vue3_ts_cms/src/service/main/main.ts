import hyRequest from "..";

export function getEntireRoles(){
    return hyRequest.post({
        url:'/role/list',
    })
}

export function getEntireDepartment(){
    return hyRequest.post({
        url:'/department/list',
    })
}