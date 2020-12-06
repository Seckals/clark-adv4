import fetch from '@/plugins/axios'
// index
export function index_get(options) {
  return fetch({
    url: 'indexController/index',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// index
export function index_head(options) {
  return fetch({
    url: 'indexController/index',
    method: 'head',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// index
export function index_post(options) {
  return fetch({
    url: 'indexController/index',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// index
export function index_put(options) {
  return fetch({
    url: 'indexController/index',
    method: 'put',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// index
export function index_delete(options) {
  return fetch({
    url: 'indexController/index',
    method: 'delete',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// index
export function index_options(options) {
  return fetch({
    url: 'indexController/index',
    method: 'options',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// index
export function index_patch(options) {
  return fetch({
    url: 'indexController/index',
    method: 'patch',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}