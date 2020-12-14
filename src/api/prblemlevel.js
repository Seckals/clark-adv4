import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'comProblemLevelController/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 职位关联的员工列表
// export function listLinkEmploy_get(options) {
//   return fetch({
//     url: 'hrPositionController/listLinkEmploy',
//     method: 'get',
//     headers: options && options.headers ? options.headers : {},
//     data: (options && options.data) || {}
//   })
// }
// 修改
export function modify_post(options) {
  return fetch({
    url: 'comProblemLevelController/modify',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 分页
export function page_get(options) {
  return fetch({
    url: 'comProblemLevelController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 删除
export function remove_post(options) {
  return fetch({
    url: 'comProblemLevelController/remove',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}