/*
 * @Author: 张鹏
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-10 10:12:54
 * @LastEditors: your name
 * @Description: 
 * @FilePath: /eqp-module/src/api/dtc.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
   return fetch({
      url: '/equipment/faultcode/add',
      method: 'post',
      headers: {
         'Content-Type': 'application/json',
         ...(options && options.headers ? options.headers : {})
      },
      data: (options && options.data) || {}
   })
}
// 修改
export function modify_post(options) {
   return fetch({
      url: '/equipment/faultcode/modify',
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
      url: '/equipment/faultcode/list',
      method: 'get',
      headers: options && options.headers ? options.headers : {},
      data: (options && options.data) || {}
   })
}
// 删除
export function remove_post(options) {
   return fetch({
      url: '/equipment/faultcode/delete',
      method: 'post',
      headers: {
         'Content-Type': 'application/json',
         ...(options && options.headers ? options.headers : {})
      },
      data: (options && options.data) || {}
   })
}