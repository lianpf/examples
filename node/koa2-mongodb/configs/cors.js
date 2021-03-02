/**
 * @desc: 跨域处理配置项
 * @author: lianpf
 * @date: 2021-02-24
 *  */
const corsConfigs = {
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}

export default corsConfigs