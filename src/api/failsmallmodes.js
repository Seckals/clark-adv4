/*
 * @Author: your name
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-25 14:48:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eqp-module/src/api/newcomTeamEmployeRefController.js
 */
import fetch from "@/plugins/axios";
// 新增
export function add_post(options) {
  return fetch({
    url: "/faultCauseDo/save",
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
    url: "/faultCauseDo/update",
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
    url: "/faultCauseDo/queryList",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
// 删除
export function remove_get(options) {
  return fetch({
    url: "/faultCauseDo/delete",
    method: "post",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}
