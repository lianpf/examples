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

  config.cors = {
    origin: 'http://localhost:8088', //匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };

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

  // server 物理地址根路径
  config.fileBaseDir = '/gitHub/lian/examples/node/egg-server'
  // server 根路径
  config.serverBaseDir = 'http://10.10.130.143:7001'
  /* ---------------------组件个性化配置------------------ */
  config.request = {
    serverUrl: 'https://httpbin.org',
  };
  // 暂时关闭csrf防御，不然影响post请求测试
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '12345678',
      // 数据库名
      database: 'localTestDB',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
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
