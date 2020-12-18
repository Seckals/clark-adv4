import fetch from '@/plugins/axios'
// 初始化KPI老数据
export function initKPI_get(options) {
  return fetch({
    url: 'common/initKPI',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询当前所有部门信息
export function queryAllDept_get(options) {
  return fetch({
    url: 'common/queryAllDept',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询所有员工
export function queryAllEmp_get(options) {
  return fetch({
    url: 'common/queryAllEmp',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 查询当前所有项目Code
export function queryAllProject_get(options) {
  return fetch({
    url: 'common/queryAllProject',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}