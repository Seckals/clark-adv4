import store from '../store'
export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocal = (key) => {

  const data = localStorage.getItem(key)
  if (!data) return
  return JSON.parse(data)
}

export const getOneFromList = (list = [], key, value) => {
  let resulte = ''
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    if (item && item[key] && item[key] === value) {
      resulte = item
      break
    }
  }
  return resulte
}
const getOneValueInOneArray = (list, key) => {
  let resulte = []
  list.forEach((item) => {
    if (item[key]) resulte.push(item[key])
    if (item.children)
      resulte = resulte.concat(getOneValueInOneArray(item.children, key))
  })
  return resulte
}

export const hasPermission = (key) => {
  const permission = store.getters.getPermission || []
  return permission.includes(key)
}
import validate from './validate'
export default {
  setLocal,
  getLocal,
  getOneFromList,
  getOneValueInOneArray,
  hasPermission,
  ...validate
}