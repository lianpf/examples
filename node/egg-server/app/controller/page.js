'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;
const { getObj, getUuid } = require('../utils/utils.js');
const UglifyJS = require("uglify-js");

/**
 * @desc: Page 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 * */
class PageController extends Controller {
  async list() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    let params = {app_id}
    const pageList = await ctx.service.page.list(params)
    ctx.body = {
      status: 200,
      data: {
        list: pageList
      },
      message: 'success'
    };
    ctx.status = 200;
  }
  async detail() {
    const { ctx } = this;
    const { pageId: page_id, appId: app_id } = ctx.query;
    let params = {app_id, page_id}
    let pageDetail, configsSchema, jsCode
    try {
      pageDetail = await ctx.service.page.detail(params)
      if (pageDetail.length > 0) {
        const { schema_id, custom_code_id } = pageDetail[0]
        console.log('-pageDetail-schema_id-', schema_id)
        console.log('-pageDetail-custom_code_id-', custom_code_id)
        configsSchema = await ctx.service.page.schema({schema_id, page_id})
        jsCode = await ctx.service.page.customCode({custom_code_id, page_id})
      }
    } catch(e) {
      console.log(e)
    }
    ctx.body = {
      code: 200,
      data: {
        detail: pageDetail.length > 0 ? getObj(pageDetail) : {},
        schema: configsSchema.length > 0 ? getObj(configsSchema).schema_content : {},
        customCode: jsCode.length > 0 ? getObj(jsCode).code : {}
      },
      msg: 'success'
    };
    ctx.status = 200;
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
      ctx.status = 200;
      ctx.body = {
        status: 200,
        data: {},
        message: '非法参数'
      }
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
        // 更新文件
        const readableStream = new Stream.Readable()
        readableStream._read = () => {}
        // console.log('--jsCode--', jsCode)
        // const testCode = "function click2 {    console.log('6542345897')}"
        // var uglifyRes = UglifyJS.minify(testCode);
        // console.log('--uglifyRes--', uglifyRes)
        readableStream.push(jsCode)
        // 写入路径
        const fileParentCatalog = 'app/public/upload/'
        const target = path.join(this.config.fileBaseDir, fileParentCatalog, filename);
        // console.log('--target--', target)
        const writeStream = fs.createWriteStream(target, { flag: 'w' });
        try {
          // 写入文件
          readableStream.pipe(writeStream)
          var testCode = fs.readFileSync("/gitHub/lian/examples/node/egg-server/app/public/upload/test.js", "utf8");
          console.log('testCode', testCode)
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(writeStream);
          throw err;
        }
        let staticCodePath = this.config.serverBaseDir +  '/public/upload/' + filename;
        ctx.body = {
          status: 200,
          data: {
            jsCode: jsCode,
            staticCodePath: staticCodePath
          },
          message: '上传成功'
        };
        ctx.status = 200;
      } else {
        ctx.status = 200;
        ctx.body = {
          status: 200,
          data: {},
          message: 'pageId非法，无当前页面!'
        }
      }
    }
  }
}

module.exports = PageController;
