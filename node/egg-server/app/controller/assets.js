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
 * @desc: Assets 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 * */
class AssetsController extends Controller {
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
  // 查找某一个
  async lookup() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    let params = {app_id}
    const assetsList = await ctx.service.assets.list(params)
    ctx.helper.handleRes.success({ctx, res: {
        list: assetsList
      }
    })
  }
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

module.exports = AssetsController;
