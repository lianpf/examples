/**
 * @desc: Helper 函数用来提供一些实用的 utility 函数
 * @date: 2021-03-29
 * @author: lianpf
 * */
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

// 处理成功响应
exports.success = ({ ctx, res = null, message = '请求成功' })=> {
  ctx.body = {
    status: 200,
    code: 0,
    data: res,
    message
  }
  ctx.status = 200
}

// 处理失败（客户端）
exports.clientError = ({ ctx, res = null, message = '参数缺失' })=> {
  ctx.body = {
    status: 400,
    code: 0,
    data: res,
    message
  }
  ctx.status = 400
}

// 处理失败（客户端）
exports.serverError = ({ ctx, res = null, message = '服务端异常' })=> {
  ctx.body = {
    status: 500,
    code: 0,
    data: res,
    message
  }
  ctx.status = 500
}

// 自定义 response
exports.customRes = ({ ctx, res = null, message = '服务端异常', status = 200, code = 0 })=> {
  ctx.body = {
    status,
    code,
    data: res,
    message
  }
  ctx.status = status
}