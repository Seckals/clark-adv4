// 注册
export default {
  login,
  register,
}
import fetch from '@/plugins/axios'
// 新增
export function login(options) {
  return fetch({
    url: '/authenticationController/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 修改
export function register(options) {
  return fetch({
    url: '/sysUserController/register',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}