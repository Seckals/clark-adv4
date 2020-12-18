import fetch from '@/plugins/axios'
// 查询BOL列表
export function bolList_get(options) {
  return fetch({
    url: '/bolDoController/allProject',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询BOL列表
export function queryAllProject_get(options) {
  return fetch({
    url: '/bolDoController/allProject',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}

// 查询所有可用年份
export function queryAllYear_get(options) {
  return fetch({
    url: 'bolDoController/queryAllYear',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询相关数据
export function queryOne_get(options) {
  return fetch({
    url: 'bolDoController/queryOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存BOL数据,使用json格式提交
export function saveBol_post(options) {
  return fetch({
    url: 'bolDoController/saveBol',
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
    url: 'bolDoController/updateBol',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}