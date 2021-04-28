'use strict';

const Controller = require('egg').Controller;
// const fs = require('fs');
// const path = require('path');
// const Stream = require('stream');
// const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;
const { getObj, getUuid, writeStrToFile } = require('../utils/utils.js');
// const UglifyJS = require("uglify-js");
// const babel = require("@babel/core");

/**
 * @Controller Common(公共模块)
 * @desc: Common 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 */

class CommonController extends Controller {
  /**
   * @summary 上传配置信息Schema
   * @description 上传Page或assets 配置信息Schema
   * @Router post /api/upload/schema
   * @Request body string pageId 页面或者资产 id
   * @Request body string schemaId 配置Schema id(无则创建，有则更新)
   * @Request body string schema 配置Schema
   * @Request body string type page/assets
   * @Request header string access_token
   * @Response 200 baseResponse ok
   */
  async uploadSchema() {
    /** @process
     * 1-检测schemaId是否有效，有则更新，无则新建且返回新的schemaId
     * 2-type区分，更新schemaId至 assets/page Table
     *  */
    const { ctx } = this;
    let { pageId: page_id = '', schemaId: schema_id, type, schema } = ctx.request.body;
    let updatePage = false
    let schemaRes = null
    try {
      schemaRes = await ctx.service.common.lookupSchema({
        schema_id,
        schema_content: schema,
        page_id
      })
      if (schema_id !== schemaRes.schema_id) {
        schema_id = schemaRes.schema_id
        if (type === 'page') {
          const result = await ctx.service.page.update({
            schema_id,
            page_id
          })
          updatePage = result.affectedRows === 1
        } else if (type === 'assets') {
          const result = await ctx.service.assets.update({
            schema_id,
            assets_id: page_id
          })
          updatePage = result.affectedRows === 1
        }
      } else {
        updatePage = true
      }
    } catch(e) {
      console.log(e)
    }
    if (schemaRes.success && updatePage ) {
      ctx.helper.handleRes.success({ctx, res: null, message: '配置保存成功'})
    } else {
      ctx.helper.handleRes.serverError({ctx, res: null, message: '配置保存失败'})
    }
  }
  /**
   * @summary 获取自定义 js code
   * @description 获取page或assets自定义 js code
   * @Router get /api/custom-code/detail
   * @Request query string customCodeId 自定义js Code 上传记录id
   * @Request header string access_token
   * @Response 200 baseResponse ok
   */
  async getCustomCode() {
    const { ctx } = this;
    let { customCodeId: custom_code_id = '' } = ctx.query;
    let result
    let _data
    try {
      result = await ctx.service.common.getCustomCode({custom_code_id})
      _data = result.length > 0 ? getObj(result) : {}
      if (result.length > 0 ) {
        _data = {
          ..._data,
          filename: `${this.config.serverBaseDir}/public/upload/${_data.filename}`
        }
      }
    } catch (e) {
      console.log(e)
    }
    ctx.helper.handleRes.success({ctx, res: _data})
  }
  /**
   * @summary 上传自定义 js code
   * @description 上传自定义 js code
   * @Router post /api/upload/code
   * @Request body string pageId 页面或者资产 id
   * @Request body string customCodeId 自定义js上传记录id(无则创建，有则更新)
   * @Request body string jsCode 自定义代码
   * @Request body string type page/assets
   * @Request header string access_token
   * @Response 200 baseResponse ok
   */
  async uploadCode() {
    /**
     * @desc: 上传自定义js code
     * @step:
     *  1-查到当前custom_code_id是否存在
     *  2-若存在，则获取filename，更新文件，更新custom_code，若不存在,则创建filename，insert custom_code，更新pages中custom_code_id
     *  3-根据type，更新pages或assets
     * */
    const { ctx } = this;
    let { jsCode, pageId: page_id, customCodeId: custom_code_id, type } = ctx.request.body;
    const types = ['page', 'assets']
    // 检查入参
    if (!page_id || !types.includes(type)) {
      ctx.helper.handleRes.clientError({ctx, res: null, message: '非法参数'})
    } else {
      const uuid = `${type}-custom-code-${getUuid()}`
      let filename = `${uuid}.js`
      try {
        const checkCodeRes = await ctx.service.common.getCustomCode({custom_code_id})
        filename = checkCodeRes.length > 0 ? getObj(checkCodeRes).filename : filename
        custom_code_id = checkCodeRes.length === 0 ? uuid : custom_code_id
        // 写入路径
        const fileParentCatalog = `${this.config.fileBaseDir}/app/public/upload/`
        let staticCodePath = this.config.serverBaseDir
        const writeResult = await writeStrToFile(ctx, jsCode, fileParentCatalog, staticCodePath, filename)
        if (writeResult.writeFlag) {
          const result = await ctx.service.common.updateCodeSyncPage({
            insertNewCode: !(checkCodeRes.length > 0),
            page_id,
            custom_code_id,
            code: jsCode,
            type,
            filename
          })
          if (result) {
            ctx.helper.handleRes.success({
              ctx,
              res: {
                jsCode: jsCode,
                staticCodePath: writeResult.staticCodePath,
                custom_code_id
              },
              message: '上传成功'
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

module.exports = CommonController;
