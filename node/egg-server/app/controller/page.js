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
 * @Controller Page（页面）
 * @desc: Page 相关api
 * @children: 1-create 2-list 3-detail 4-update 5-uploadCode
 */
class PageController extends Controller {
  /**
   * @summary 查询app内Page列表
   * @description 根据appId查询app内Page列表
   * @Router get /api/page/list
   * @Request query string appId 应用ID
   * @Request header string access_token
   * @Response 200 pageListResponse ok
   */
  async list() {
    const { ctx } = this;
    const { appId: app_id = '' } = ctx.query;
    let params = {app_id}
    const pageList = await ctx.service.page.list(params)
    ctx.helper.handleRes.success({ctx, res: {
        list: pageList
      }
    })
  }
  /**
   * @summary 创建新页面
   * @description 创建应用内新的资产
   * @Router post /api/page/create
   * @Request body createPageRequest *body
   * @Response 200 baseResponse ok
   */
   async create() {
    const { ctx } = this;
    const { appId: app_id = '', pageName: page_name } = ctx.request.body;
    const page_id = `page-${page_name}-${getUuid()}`
    const createAssetsRes = await ctx.service.assets.create({
      page_id,
      page_name,
      app_id,
      drag_platform_path: '/configs?type=page'
    })
    if (createAssetsRes) {
      ctx.helper.handleRes.success({ctx, res: {}, message: '新增页面成功'})
    }
  }
  /**
   * @summary 查询Page详细信息
   * @description 根据pageId查询Page详细信息
   * @Router get /api/page/detail
   * @Request query baseRequest pageId description-createUser
   * @Request header string access_token
   * @Response 200 pageDetailResponse ok
   */
  async detail() {
    const { ctx } = this;
    const { pageId: page_id, appId: app_id } = ctx.query;
    let params = {app_id, page_id}
    let pageDetail, configsSchema, jsCode
    try {
      pageDetail = await ctx.service.page.detail(params)
      if (pageDetail.length > 0) {
        const { schema_id, custom_code_id } = pageDetail[0]
        configsSchema = await ctx.service.page.schema({schema_id, page_id})
        jsCode = await ctx.service.page.customCode({custom_code_id, page_id})
      }
    } catch(e) {
      console.log(e)
    }
    ctx.helper.handleRes.success({
      ctx,
      res: {
        detail: pageDetail.length > 0 ? getObj(pageDetail) : {},
        schema: configsSchema.length > 0 ? getObj(configsSchema).schema_content : {},
        customCode: jsCode.length > 0 ? getObj(jsCode).code : {}
      }
    })
  }
  /**
   * @summary 查询Page简要信息
   * @description 根据pageId查询Page详细信息
   * @Router get /api/page/brief-info
   * @Request query string *pageId 唯一ID
   * @Request header string access_token
   * @Response 200 pageBriefInfoResponse ok
   */
   async briefInfo() {
    const { ctx } = this;
    const { pageId: page_id } = ctx.query;
    let params = {page_id}
    let pageDetail
    try {
      pageDetail = await ctx.service.page.detail(params)
    } catch (e) {
      console.log(e)
    }
    ctx.helper.handleRes.success({
      ctx,
      res: pageDetail.length > 0 ? getObj(pageDetail) : {}
    })
  }
  /**
   * @summary Page模块-上传自定义js code（描述必读）
   * @description Page模块-上传自定义js code（建议使用公共模块上传接口, /api/upload/code）
   * @Router post /api/page/upload-code
   * @Request body pageCodeRequest *body
   * @Request header string access_token
   * @Response 200 baseResponse ok
   * */
  async uploadCode() {
    /**
     * @step:
     *  1-查到pages当前page是否存在custom_code_id
     *  2-若存在，则获取filename，更新文件，更新custom_code
     *  3-若不存在,则创建filename，insert custom_code，更新pages中custom_code_id
     * */
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

module.exports = PageController;
