'use strict';

// 引入框架
const Controller = require('apr').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;

    // use service defined in framework
    const data = await ctx.service.test.get(123);
    const result = await ctx.service.code.storageCustomCode();
    await ctx.render('home.tpl', Object.assign({}, data, result));
    // ctx.body = {
    //   code: 200,
    //   data: {
    //     message: 'Apr, Hello world'
    //   },
    //   message: 'success'
    // };
    // ctx.status = 200
  }
}

module.exports = HomeController;
