// import dateFormat from "dateformat";
// import config from "./config";
// import Loadable from 'react-loadable'
// import getLoadingComponent from '../components/loading'
// var path  = require('path')

/**
 * 获取路由
 * @param { activeStatus: 0, statusArr: [{status: 0, value: "成功"}, {status: 1, value: "失败"}]}
 * */
export function getUrl (str) {
  let _str = str.substring(1, str.length -1 );
  return _str;
}