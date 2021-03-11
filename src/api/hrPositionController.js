/*
 * @Author: 张鹏
 * @Date: 2021-03-11 19:39:32
 * @LastEditTime: 2021-03-11 19:54:17
 * @LastEditors: your name
 * @Description: 
 * @FilePath: /clark-adv4/src/api/hrPositionController.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
   return fetch({
      url: 'hrPositionController/add',
      method: 'post',
      headers: { 'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {}) },
      data: (options && options.data) || {}
   })
}
// 职位关联的员工列表
export function listLinkEmploy_get(options) {
   return fetch({
      url: 'hrPositionController/listLinkEmploy',
      method: 'get',
      headers: options && options.headers ? options.headers : {},
      data: (options && options.data) || {}
   })
}
// 修改
export function modify_post(options) {
   return fetch({
      url: 'hrPositionController/modify',
      method: 'post',
      headers: { 'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {}) },
      data: (options && options.data) || {}
   })
}
// 分页
export function page_get(options) {
   return fetch({
      url: 'hrPositionController/page',
      method: 'get',
      headers: options && options.headers ? options.headers : {},
      data: (options && options.data) || {}
   })
}
// 删除
export function remove_post(options) {
   return fetch({
      url: 'hrPositionController/remove',
      method: 'post',
      headers: { 'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {}) },
      data: (options && options.data) || {}
   })
}