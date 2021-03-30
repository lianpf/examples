'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list() {
    const { ctx } = this;
    const page = ctx.query.page || 1;
    const { uid: id = '001', page: tag = 'home' } = ctx.query;
    let params = {id, tag}
    const dataList = await ctx.service.news.list(page)
    const userInfo = await ctx.service.news.storageUser(params)
    ctx.body = {
      code: 200,
      data: {
        user: userInfo,
        list: dataList
      },
      msg: 'success'
    };
  }
  async upload() {
    const { ctx } = this;
    const { uid: id = '001', page: tag = 'home' } = ctx.query;
    let params = {id, tag}
    const userInfo = await ctx.service.news.storageUser(params)
    ctx.body = userInfo;
  }
}

module.exports = ApiController;
