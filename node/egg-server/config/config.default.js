/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 用于cookie签名密钥，应更改为你自己的 Cookie 安全字符串
  config.keys = appInfo.name + '_1617081780536_9800';

  // add your middleware config here
  config.middleware = [
    'robot'
  ];
  config.robot = { // 拦截机器人 configs: 对应UA
    ua: [
      /Baidu/i,
    ]
  };

  /* ---------------------组件个性化配置------------------ */
  config.request = {
    serverUrl: 'https://httpbin.org',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
