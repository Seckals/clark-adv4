import fetch from '@/plugins/axios'
// 查询HC列表
export function hcList_get(options) {
  return fetch({
    url: 'hcDo/hcList',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有可用年份
export function queryAllYear_get(options) {
  return fetch({
    url: 'hcDo/queryAllYear',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有HcType
export function queryHcType_get(options) {
  return fetch({
    url: 'hcDo/queryHcType',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询相关数据
export function queryOne_get(options) {
  return fetch({
    url: 'hcDo/queryOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存HC数据,使用json格式提交
export function saveHc_post(options) {
  return fetch({
    url: 'hcDo/saveHc',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}
// 更新HC数据,使用json格式提交
export function updateHc_post(options) {
  return fetch({
    url: 'hcDo/updateHc',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}