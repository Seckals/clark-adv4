import fetch from '@/utils/fetch'
// errorHtml
export function error_get(options) {
  return fetch({
    url: 'error',
    method: 'get',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_head(options) {
  return fetch({
    url: 'error',
    method: 'head',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_post(options) {
  return fetch({
    url: 'error',
    method: 'post',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_put(options) {
  return fetch({
    url: 'error',
    method: 'put',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_delete(options) {
  return fetch({
    url: 'error',
    method: 'delete',
    headers: options && options.headers ? options.headers : {},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_options(options) {
  return fetch({
    url: 'error',
    method: 'options',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}
// errorHtml
export function error_patch(options) {
  return fetch({
    url: 'error',
    method: 'patch',
    headers: {'Content-Type': 'application/json', ...(options && options.headers ? options.headers : {})},
    data: (options && options.data) || {}
  })
}