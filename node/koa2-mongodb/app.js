const Koa = require('koa');
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const bodyParser = require('koa-bodyparser')
// const router = require('koa-router')()
const cors = require('koa2-cors')
const app = new Koa()
import router from './app/router'

// 处理跨域的配置
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

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