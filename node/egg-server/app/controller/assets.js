'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;
const { getObj, getUuid } = require('../utils/utils.js');
const UglifyJS = require("uglify-js");
const babel = require("@babel/core");

/**
 * @Controller Assets（资产）
 * @desc: Assets 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 */
class AssetsController extends Controller {
  /**
   * @summary 资产列表信息
   * @description 根据appId查询应用内资产列表信息
   * @Router get /api/assets/list
   * @Request query baseRequest pageId description-createUser
   * @Request header string access_token
   * @Response 200 assetsListResponse ok
   */
  async list() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    let params = {app_id}
    const assetsList = await ctx.service.assets.list(params)
    ctx.helper.handleRes.success({ctx, res: {
        list: assetsList
      }
    })
  }
  /**
   * @summary 创建新的资产
   * @description 创建应用内新的资产
   * @Router post /api/assets/create
   * @Request body createAssetsRequest *body
   * @Response 200 baseResponse ok
   */
  async create() {
    const { ctx } = this;
    const { appId: app_id = '', assetsName: assets_name, assetsDesc: assets_desc } = ctx.request.body;
    const assets_id = `assets-${assets_name}-${getUuid()}`
    const createAssetsRes = await ctx.service.assets.create({
      assets_id,
      assets_name,
      assets_desc,
      app_id,
      drag_platform_path: '/configs?type=assets'
    })
    if (createAssetsRes) {
      ctx.helper.handleRes.success({ctx, res: {}, message: '新增资产成功'})
    }
  }
  // 简要信息
  /**
   * @summary 查询资产简要信息
   * @description 根据 assetsId 查询资产简要信息
   * @Router get /api/assets/brief-info
   * @Request query string assetsId 资产id
   * @Request header string access_token
   * @Response 200 assetsBriefInfoResponse ok
   */
  async briefInfo() {
    const { ctx } = this;
    const { assetsId: assets_id } = ctx.query;
    let params = {assets_id}
    let assetsDetail
    try {
      assetsDetail = await ctx.service.assets.briefInfo(params)
    } catch(e) {
      console.log(e)
    }
    ctx.helper.handleRes.success({
      ctx,
      res: assetsDetail.length > 0 ? getObj(assetsDetail) : {}
    })
  }
}

module.exports = AssetsController;
