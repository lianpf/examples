/**
 * @desc: Helper 函数用来提供一些实用的 utility 函数
 * @date: 2021-03-29
 * @author: lianpf
 * */
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

// 统一处理 response
const setResponse = ({ ctx, res = null, message = 'success', status = 200, code = 0 }) => {
  ctx.body = {
    status,
    code,
    data: res,
    message
  }
  ctx.status = status
}
exports.handleRes = {
  'success': ({ ctx, res = null, message = '请求成功' }) => setResponse({ctx, res, message}), // 处理成功响应
  'clientError': ({ ctx, res = null, message = '参数缺失' }) => setResponse({ ctx, res, message}), // 处理失败（客户端）
  'serverError': ({ ctx, res = null, message = '服务端异常' }) => setResponse({ ctx, res, message}), // 处理失败（服务端）
  'customRes': ({ ctx, res = null, message = '服务端异常', status = 200, code = 0 }) => setResponse({ ctx, res, message, status, code}) // 自定义 response
}

// ORM: 处理数据库映射字段
exports.handleORM = (data) => {
  if (
    data !== null &&
    typeof data === 'object' &&
    ((Array.isArray(data) && data.length > 0) || (!Array.isArray(data) && Object.keys(data).length > 0))
  ) {
    data = ormHandleAction(data)
  }
  return data
}

const ormHandleAction = (data) => {
  let dataIsArr = Array.isArray(data)
  // object: 1-单纯object 2-array 3-date
  let humpData = dataIsArr ? [] : data instanceof Date ? data : {}
  if (dataIsArr) {
    data.forEach((item) => {
      // 仅有纯object、json 数组，需要递归
      if (typeof item === 'object' && (Array.isArray(data) || !data instanceof Date)) {
        humpData.push(ormHandleAction(item))
      } else { // common array
        humpData.push(item)
      }
    })
  } else {
    for (let key in data) {
      // 基础类型 + Date
      if (typeof data[key] !== 'object' || (typeof data[key] === 'object' && (data[key] instanceof Date || data[key] === null))) {
        humpData[toHump(key)] = data[key]
      } else {
        humpData[toHump(key)] = ormHandleAction(data[key])
      }
    }
  }
  return humpData
}

// 转驼峰
const toHump = (str) => {
  let newStr = ''
  let arr = str.split('_') //先用字符串分割成数组
  arr.forEach((item, index) => {
    if (index > 0) {
      return newStr += item.replace(item[0], item[0].toUpperCase())
    } else {
      return newStr += item
    }
  })
  return newStr
}