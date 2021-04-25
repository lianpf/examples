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
 * @desc: Common 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 * */
class CommonController extends Controller {
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
   * @desc: 上传自定义js code
   * @step:
   *  1-查到pages当前page是否存在custom_code_id
   *  2-若存在，则获取filename，更新文件，更新custom_code
   *  3-若不存在,则创建filename，insert custom_code，更新pages中custom_code_id
   * */
  async uploadCode() {
    const { ctx } = this;
    const { jsCode, pageId: page_id } = ctx.request.body;
    if (!page_id) {
      ctx.helper.handleRes.clientError({ctx, res: {}, message: '非法参数'})
    } else {
      let pageDetail = await this.service.page.detail({page_id})
      if (pageDetail.length > 0) {
        let { page_name, custom_code_id} = getObj(pageDetail)
        let filename = `${page_name}-code-${getUuid()}.js`
        if (custom_code_id) {
          // 存在自定义 code, 则启动更新逻辑
          let codeRes = await this.service.page.customCode({custom_code_id, page_id})
          filename = getObj(codeRes).filename
          // 更新 custom_code
          await this.service.page.updateCustomCode({code: jsCode, custom_code_id})
        } else {
          // 插入 custom_code
          // 更新pages 内 custom_code_id
          custom_code_id = `${page_name}-code-${getUuid()}`
          await this.service.page.insertCustomCode({page_id, custom_code_id, filename, code: jsCode})
          // console.log('--111-result--', result)
        }
        // 编译js
        const compileRes = babel.transformSync(jsCode, {
          presets: [
            [
              '@babel/preset-env'
            ]
          ],
          code: true
        });
        // console.log('--compileRes.code--', compileRes.code)
        // 压缩 js code
        const uglifyRes = UglifyJS.minify(compileRes.code, {
          keep_fnames: true
        });
        if (uglifyRes.error) {
          // console.log('--uglifyRes--', uglifyRes)
          ctx.helper.handleRes.clientError({ctx, res: {}, message: '参数错误'})
          // ctx.body = {
          //   status: 400,
          //   data: {},
          //   message: '参数错误'
          // };
          // ctx.status = 400;
          return;
        }
        // 更新文件
        const readableStream = new Stream.Readable()
        readableStream._read = () => {}
        readableStream.push(uglifyRes.code)
        // 写入路径
        const fileParentCatalog = 'app/public/upload/'
        const target = path.join(this.config.fileBaseDir, fileParentCatalog, filename);
        // console.log('--target--', target)
        const writeStream = fs.createWriteStream(target, { flag: 'w' });
        try {
          // 写入文件
          readableStream.pipe(writeStream)
          // var testCode = fs.readFileSync("/gitHub/lian/examples/node/egg-server/app/public/upload/test.js", "utf8");
          // console.log('testCode', testCode)
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(writeStream);
          throw err;
        }
        let staticCodePath = this.config.serverBaseDir +  '/public/upload/' + filename;
        ctx.helper.handleRes.success({
          ctx,
          res: {
            jsCode: jsCode,
            staticCodePath: staticCodePath
          },
          message: '上传成功'
        })
        // ctx.body = {
        //   status: 200,
        //   data: {
        //   },
        //   message: ''
        // };
        // ctx.status = 200
      } else {
        ctx.helper.handleRes.serverError({ctx, message: 'pageId非法，无当前页面!'})
        // ctx.status = 200;
        // ctx.body = {
        //   status: 200,
        //   data: {},
        //   message: 'pageId非法，无当前页面!'
        // }
      }
    }
  }
}

module.exports = CommonController;
