import fetch from '@/plugins/axios'
// 查询BOL列表
export function bolList_get(options) {
  return fetch({
    url: 'bolDo/bolList',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有可用年份
export function queryAllYear_get(options) {
  return fetch({
    url: 'bolDo/queryAllYear',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询相关数据
export function queryOne_get(options) {
  return fetch({
    url: 'bolDo/queryOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存BOL数据,使用json格式提交
export function saveBol_post(options) {
  return fetch({
    url: 'bolDo/saveBol',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 更新BOL,使用json格式提交
export function updateBol_post(options) {
  return fetch({
    url: 'bolDo/updateBol',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}