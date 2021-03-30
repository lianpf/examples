/**
 * @desc: Helper 函数用来提供一些实用的 utility 函数
 * @date: 2021-03-29
 * @author: lianpf
 * */
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();