'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;
const { getObj, getUuid } = require('../utils/utils.js');

/**
 * @Controller App（应用）
 * @desc: Application 相关api
 * @children: 1-create 2-list 3-detail 4-update
 */
class AppController extends Controller {
  /**
   * @summary 查询App列表
   * @description 查询App列表
   * @Router get /api/app/list
   * @Request query baseRequest name description-baseRequest
   * @Request header string access_token
   * @Response 200 appListResponse ok
   */
  async list() {
    const { ctx } = this;
    const appList = await ctx.service.app.list()
    ctx.helper.handleRes.success({ctx, res: appList, message: appList.length > 0 ? 'success' : '当前无应用，请先创建应用！'})
  }
  /**
   * @summary 创建新的应用
   * @description 创建新的应用
   * @Router post /api/app/create
   * @Request body createAppRequest *body
   * @Response 200 baseResponse ok
   */
   async create() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(ctx.rule.createAppRequest)
    const { appName: app_name = '', appDesc: app_desc  } = ctx.request.body;
    const app_id = `${app_name}-${getUuid()}`
    const appDetail = await ctx.service.app.create({
      app_id,
      app_name,
      app_desc
    })
    ctx.helper.handleRes.success({ctx, res: getObj(appDetail), message: appDetail.length > 0 ? 'success' : '不存在该页面'})
  }
  /**
   * @summary 查询app详细信息
   * @description 根据appId查询app详细信息
   * @Router get /api/app/detail
   * @Request query string *appId 应用ID
   * @Response 200 appDetailResponse ok
   */
  async detail() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(ctx.rule.createAppDetailRequest, ctx.request.query)
    const { appId: app_id = '' } = ctx.query;
    const appDetail = await ctx.service.app.detail(app_id)
    ctx.helper.handleRes.success({ctx, res: getObj(appDetail), message: appDetail.length > 0 ? 'success' : '不存在该页面'})
  }
}

module.exports = AppController;
