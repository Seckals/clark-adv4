import fetch from '@/plugins/axios'
// 删除记录
export function _delete_post(options) {
  return fetch({
    url: 'deptReasonCodeDo/delete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 查询部门原因代码列表
export function queryList_get(options) {
  return fetch({
    url: 'deptReasonCodeDo/queryList',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询一条记录
export function queryOne_get(options) {
  return fetch({
    url: 'deptReasonCodeDo/queryOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存记录
export function save_post(options) {
  return fetch({
    url: 'deptReasonCodeDo/save',
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
    url: 'deptReasonCodeDo/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}