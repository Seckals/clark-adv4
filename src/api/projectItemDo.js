import fetch from '@/plugins/axios'
// 删除记录
export function _delete_post(options) {
  return fetch({
    url: 'projectItemController/delete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}

// 查询一条记录
export function queryAllProject_get(options) {
  return fetch({
    url: '/projectItemController/allProject',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询一条记录
export function getOne_get(options) {
  return fetch({
    url: 'projectItemController/getOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询列表
export function queryList_get(options) {
  return fetch({
    url: 'projectItemController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存记录
export function save_post(options) {
  return fetch({
    url: 'projectItemController/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 更新记录
export function update_post(options) {
  return fetch({
    url: 'projectItemController/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}