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
// 注册
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
// 注册
export function active(options) {
  return fetch({
    url: 'sysUserController/active',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 重置密码
export function resetPassword(options) {
  return fetch({
    url: 'sysUserController/resetPassword',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 新密码
export function newPassword(options) {
  return fetch({
    url: 'sysUserController/newPassword',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 发送邮件
export function sendEmail(options) {
  return fetch({
    url: '/sysUserController/forgetPassword',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}