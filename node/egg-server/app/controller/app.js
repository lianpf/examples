'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;

/**
 * @desc: Application 相关api
 * @children: 1-create 2-list 3-detail 4-update
 * */
class AppController extends Controller {
  async list() {
    const { ctx } = this;
    const appList = await ctx.service.app.list()
    ctx.body = {
      status: 200,
      data: appList,
      message: appList.length > 0 ? 'success' : '当前无应用'
    };
    ctx.status = 200;
  }
  async detail() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    const appDetail = await ctx.service.app.detail(app_id)
    // console.log('--appDetail--', Array.isArray(appDetail))
    ctx.body = {
      status: 200,
      data: appDetail.length > 0 ? appDetail[0] : {},
      message: appDetail.length > 0 ? 'success' : '不存在该页面'
    };
    ctx.status = 200;
  }
}

module.exports = AppController;
