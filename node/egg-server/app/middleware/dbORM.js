/**
 * @desc: 针对egg-mysql获取到的数据，无法从下划线字段转为驼峰（除非使用原生sql）
 * @path: app/middleware/dbORM.js
 * @date: 2021-04-20
 * @author: lianpf
 */
 module.exports = (options, app) => {
  // options === app.config.dbORM
  return async function dbORMMiddleware(ctx, next) {
    await next();
    const apiReg = /^\/api\/*/i
    if (options.open && apiReg.test(ctx.request.url)) {
      ctx.body.data = ctx.helper.handleORM(ctx.body.data)
    }
  }
};
