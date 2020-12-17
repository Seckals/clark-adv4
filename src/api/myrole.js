import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'sysRoleController/add',
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
    url: 'sysRoleController/modify',
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
    url: '/sysRoleController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 新增准备
export function preAdd_get(options) {
  return fetch({
    url: '/sysRoleController/add',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 修改准备
export function preModify_get(options) {
  return fetch({
    url: '/sysRoleController/modify',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 分页前数据准备
export function preAdd(options) {
  return fetch({
    url: '/sysRoleController/preAdd',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}


// 分页前数据准备
export function prePage(options) {
  return fetch({
    url: '/sysRoleController/prePage',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}


// 角色关联或解除关联功能
export function linkOrUnlinkSysFunction(options) {
  return fetch({
    url: 'sysRoleController/unlinkSysUser',
    method: 'post',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联功能
export function linkSysFunction(options) {
  return fetch({
    url: 'sysRoleController/linkOrUnlinkSysFunction',
    method: 'post',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联功能
export function linkSysUser(options) {
  return fetch({
    url: 'sysRoleController/linkSysUser',
    method: 'post',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}

// 角色关联功能分页
export function pageLinkSysFunction(options) {
  return fetch({
    url: 'sysRoleController/pageLinkSysFunction',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联用户分页
export function pageLinkSysUser(options) {
  return fetch({
    url: 'sysRoleController/pageLinkSysUser',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联功能准备
export function preLinkSysFunction(options) {
  return fetch({
    url: 'sysRoleController/preLinkSysFunction',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联用户准备
export function prelinkSysUser(options) {
  return fetch({
    url: 'sysRoleController/prelinkSysUser',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色关联用户分页准备
export function prePageLinkSysUser(options) {
  return fetch({
    url: 'sysRoleController/prePageLinkSysUser',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}


// 角色解除关联功能
export function unlinkSysFunction(options) {
  return fetch({
    url: 'sysRoleController/unlinkSysFunction',
    method: 'post',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// 角色解除关联用户
export function unlinkSysUser(options) {
  return fetch({
    url: 'sysRoleController/unlinkSysUser',
    method: 'post',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}