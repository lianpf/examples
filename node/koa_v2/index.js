const Koa = require('koa')
const app = new Koa({
  // 代理
  // proxy: true
});

// logger
app.use(async (ctx, next) => {
  console.log('--0-0--')
  await next();
  const rt = ctx.response.get('X-Response-Time')
  console.log(`--0-1-- ${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  console.log('--1-0--')
  const start = new Date()
  await next()
  const ms = Date.now() - start;
  console.log('--1-1--')
  ctx.set('X-Response-Time', `${ms}ms`);
})

// response
app.use(async ctx => {
  ctx.body = 'Hello World, Koa!'
})

app.listen(3000)