'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;
const { getObj, getUuid } = require('../utils/utils.js');

/**
 * @desc: Application 相关api
 * @children: 1-create 2-list 3-detail 4-update
 * */
class AppController extends Controller {
  async list() {
    const { ctx } = this;
    const appList = await ctx.service.app.list()
    ctx.helper.handleRes.success({ctx, res: appList, message: appList.length > 0 ? 'success' : '当前无应用，请先创建应用！'})
  }
  async detail() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    const appDetail = await ctx.service.app.detail(app_id)
    ctx.helper.handleRes.success({ctx, res: getObj(appDetail), message: appDetail.length > 0 ? 'success' : '不存在该页面'})
  }
}

module.exports = AppController;
