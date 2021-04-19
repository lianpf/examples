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