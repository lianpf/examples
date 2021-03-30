/**
 * @desc: 拦截机器人 middleware
 * @path: app/middleware/robot.js
 * @test-code: 终端输入 curl http://localhost:7001/api -A "Baidu"
 * @date: 2021-03-29
 * @author: lianpf
 */
module.exports = (options, app) => {
  // options === app.config.robot
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot. _ lian';
    } else {
      await next();
    }
  }
};