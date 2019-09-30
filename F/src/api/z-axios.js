import axios from 'axios'
import {
  Message
} from 'element-ui' 

var baseURL = 'http://192.168.17.149:7001'




/**
 * 封装form-data格式文件参数上传请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function upfrom(url, data) { 
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      baseURL: baseURL,  
      data 
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      baseURL: baseURL, 
    }).then(res => {
      if (!res) resolve(0)
      if (res.data.code == 1 || res.data.code == 1001) {
        resolve(res.data, res.data.msg)
      }
    }).catch(err => {
      reject(err)
    })

  })
}

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, data, responseType) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: data,
      baseURL: baseURL,
      responseType: responseType || 'json', 

    }).then(res => {
      if (res.data.code == 1001) {
        resolve(res.data.data);
      }
      if (responseType) {
        //请求成功 
        resolve(res.data.data)
      }
    }).catch(err => {
      reject(err)
    })

  })
}

// 下载文件
export function getfile(url, data, responseType) {
    console.log(data);
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: data,
        baseURL: baseURL,
        responseType: 'blob',  
      }).then(res => {
       
          //请求成功 
          resolve(res.data)
       
      }).catch(err => {
        reject(err)
      })
  
    })
  }
  