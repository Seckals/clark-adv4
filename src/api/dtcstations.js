/*
 * @Author: your name
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-25 16:28:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eqp-module/src/api/dtcstations.js
 */
import fetch from "@/plugins/axios";
// 新增
export function add_post(options) {
  return fetch({
    url: "/equipment/faultcode/station/add",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {}),
    },
    data: (options && options.data) || {},
  });
}
// 修改
export function modify_post(options) {
  return fetch({
    url: "/equipment/faultcode/station/modify",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {}),
    },
    data: (options && options.data) || {},
  });
}
// 分页
export function page_get(options) {
  return fetch({
    url: "/equipment/faultcode/station/list",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
export function page_comLineController_list(options) {
  return fetch({
    url: "comLineController/list",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
export function page_faultcode_list(options) {
  return fetch({
    url: "equipment/faultcode/list/all",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
export function page_comStationController_list(options) {
  return fetch({
    url: "comStationController/list",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
// 删除
export function remove_get(options) {
  return fetch({
    url: "/equipment/faultcode/station/delete",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {}),
    },
    data: (options && options.data) || {},
  });
}
