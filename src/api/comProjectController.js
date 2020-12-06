import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'comProjectController/add',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 修改
export function modify_post(options) {
  return fetch({
    url: 'comProjectController/modify',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 分页
export function page_get(options) {
  return fetch({
    url: 'comProjectController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 新增准备
export function preAdd_get(options) {
  return fetch({
    url: 'comProjectController/preAdd',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 修改准备
export function preModify_get(options) {
  return fetch({
    url: 'comProjectController/preModify',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 分页准备
export function prePage_get(options) {
  return fetch({
    url: 'comProjectController/prePage',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 删除
export function remove_get(options) {
  return fetch({
    url: 'comProjectController/remove',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}