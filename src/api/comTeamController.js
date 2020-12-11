import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'comTeamController/add',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 修改
export function modify_post(options) {
  return fetch({
    url: 'comTeamController/modify',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// 分页
export function page_get(options) {
  return fetch({
    url: 'comTeamController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 列表/查询所有未被删除的
export function preAdd_get(options) {
  return fetch({
    url: 'comTeamController/list',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 详情，一条数据
export function preModify_get(options) {
  return fetch({
    url: 'comTeamController/detail',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 删除
export function remove_get(options) {
  return fetch({
    url: 'comTeamController/remove',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}