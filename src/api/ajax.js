import { message } from 'antd'
import axios from 'axios'

export default function ajax(url, data = {}, type = 'get') {
  return new Promise((resolve, reject) => {
    // 1. 执行异步ajax请求
    let promise
    if (type === 'get') {
      promise = axios.get(url, {
        params: data,
      })
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then((response) => {
        // 2. 请求成功了
        resolve(response.data)
      })
      .catch((error) => {
        // 3. 请求失败了
        // reject(error)
        message.error('请求出错：' + error.message)
      })
  })
}
