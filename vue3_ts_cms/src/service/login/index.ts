import hyRequest from "..";
import type { RuleForm } from '@/types/login'
export function accountLoginRequest(account: RuleForm) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
//获取用户身份信息
export function getUserRoleByid(id: number) {
  return hyRequest.get({
    url: '/users/' + id
  })
}
//获取不同菜单树
export function getMenuTreeByRole(id: number) {
  return hyRequest.get({
    url: '/role/' + id + '/menu'
  })
}