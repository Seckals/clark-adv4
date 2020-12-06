import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'hrEmployeController/add',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 修改
export function modify_post(options) {
  return fetch({
    url: 'hrEmployeController/modify',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 分页
export function page_get(options) {
  return fetch({
    url: 'hrEmployeController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 新增准备
export function preAdd_get(options) {
  return fetch({
    url: 'hrEmployeController/preAdd',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 修改准备
export function preModify_get(options) {
  return fetch({
    url: 'hrEmployeController/preModify',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 分页前数据准备
export function prePage_get(options) {
  return fetch({
    url: 'hrEmployeController/prePage',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 删除
export function remove_post(options) {
  return fetch({
    url: 'hrEmployeController/remove',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}