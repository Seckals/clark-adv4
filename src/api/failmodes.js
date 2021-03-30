/*
 * @Author: your name
 * @Date: 2021-02-23 10:25:12
 * @LastEditTime: 2021-03-25 14:39:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eqp-module/src/api/comTeamController.js
 */
import fetch from "@/plugins/axios";
// 新增
export function add_post(options) {
  return fetch({
    url: "/maintenanceTypeDo/save",
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
    url: "/maintenanceTypeDo/update",
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
    url: "/maintenanceTypeDo/queryList",
    method: "get",
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {},
  });
}

// 删除
export function remove_get(options) {
  return fetch({
    url: "/maintenanceTypeDo/delete",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {}),
    },
    data: (options && options.data) || {},
  });
}
