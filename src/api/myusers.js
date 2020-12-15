import fetch from '@/plugins/axios'
// 新增
export function add_post(options) {
  return fetch({
    url: 'sysUserController/add',
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
    url: '/sysUserController/modify',
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
    url: '/sysUserController/page',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}

// 分页前数据准备
export function prePage_get(options) {
  return fetch({
    url: 'sysUserController/prePage',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}