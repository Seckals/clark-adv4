import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';

// 请求超时
const TIMEOUT = 10000

// 创建axios实例
const fetch = axios.create({
<<<<<<< HEAD
  baseURL:  process.env.VUE_APP_BASE_URL,
=======
  // baseURL: `//${window.location.hostname !== '192.168.195.131' ? '49.235.30.187' : '192.168.195.131'}:9001/md/`,

  baseURL: `//${window.location.hostname}:9001/md/`,

>>>>>>> 959ca79be3c22b582f9c63ac1b3b4c8cf9f71184
  // 超时
  timeout: TIMEOUT,
  // 是否跨域携带cookie
  withCredentials: true,
})

// 请求拦截器
fetch.interceptors.request.use(
  function (config) {
    // REST风格接口
    for (const key in config.data) {
      if (key.indexOf('{') === 0) {
        config.url = config.url.replace(key, config.data[key])
        delete config.data[key]
      }
    }
    // 去除没有值的属性
    for (const key in config.data) {
      const val = config.data[key]
      if (val === undefined || val === '' || val == null) {
        delete config.data[key]
      }
    }
    // get传参
    if (config.method === 'get' && config.data && Object.keys(config.data).length !== 0) {
      config.url += `?${qs.stringify(config.data)}`
    }

    // 设置header-token 和 userid
    const authInfoString = localStorage.getItem('auth-info')
    const authInfo = authInfoString ? JSON.parse(authInfoString) : null
    config.headers._mes_auth_token = config.headers._mes_auth_token || (authInfo ? authInfo.token : '')

    // application/x-www-form-urlencoded
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加请求返回拦截器
fetch.interceptors.response.use(
  function (res) {
    const {data} = res
    const code = +data.code

    if (code === 200 || data.success) {
      // 约定code=200即为成功
      return data.result
    }
    
    /**
     * 异常处理
     * 可以做统一的错误提示
     */
    // if (res.config.url.includes('/accountSafe/checkPassword') && code === 1021002) {
    //   return Promise.reject(data)
    // }

    // 登录失效
    if (code === 401) {
      location.href = `//${location.host}/auth/#/user/login?from=${encodeURIComponent(location.href)}`
      return false
    }

    message.error(data.message)
    // console.log(data.message)
    return Promise.reject(data)
  },
  function (error) {
    if (error.message !== 'cancel') {
      message.error(error.message)
    }

    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default fetch
