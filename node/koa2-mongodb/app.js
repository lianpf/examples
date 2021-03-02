/**
 * @desc: 入口文件
 * @author: lianpf
 * @date: 2021-02-24
 *  */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
import router from './app/router'
import corsConfigs from './configs/cors'

// 处理跨域的配置
app.use(cors(corsConfigs));

// logger 中间件
// const loggerAsync = require('./middleware/logger-async')
// app.use(loggerAsync())

// router
app.use(bodyParser()); // 解析request的body
app.use(router.routes());

// response
// app.use(async ctx => {
//   ctx.body = 'Hello World, Koa!'
// })

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...')