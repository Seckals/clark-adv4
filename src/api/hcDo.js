/*
 * @Author: your name
 * @Date: 2021-03-25 12:04:00
 * @LastEditTime: 2021-03-30 11:28:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /clark-adv4/src/api/hcDo.js
 */
import fetch from '@/plugins/axios'
// 查询HC列表
export function hcList_get(options) {
  return fetch({
    url: 'hcDoController/hcList',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询HC列表
export function queryAllProject_get(options) {
  return fetch({
    url: '/hcDoController/allProject',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}

// 查询所有可用年份
export function queryAllYear_get(options) {
  return fetch({
    url: 'hcDoController/queryAllYear',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有HcType
export function querycomLineController_get(options) {
  return fetch({
    url: 'comLineController/list',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有HcType
export function queryHcType_get(options) {
  return fetch({
    url: 'hcDoController/queryHcType',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询相关数据
export function queryOne_get(options) {
  return fetch({
    url: 'hcDoController/queryOne',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 保存HC数据,使用json格式提交
export function saveHc_post(options) {
  return fetch({
    url: 'hcDoController/saveHc',
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
    url: 'hcDoController/updateHc',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      ...(options && options.headers ? options.headers : {})
    },
    data: (options && options.data) || {}
  })
}