'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Stream = require('stream');
const sendToWormhole = require('stream-wormhole');
// const awaitWriteStream = require('await-stream-ready').write;

/**
 * @desc: Page 相关api
 * @children: 1-create 2-list 3-detail 4-update
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
    const page = ctx.query.page || 1;
    const { pageId: page_id, appId: app_id } = ctx.query;
    let params = {id, tag}
    const dataList = await ctx.service.page.list(page)
    const userInfo = await ctx.service.page.detail(params)
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
    const { uid: id = '001' } = ctx.query;
    const { jsCode } = ctx.request.body;
    let params = {id}
    let filename = 'test'
    // const userInfo = await ctx.service.news.storageUser(params)
    // TODO: 将获取到的内容转化为流，塞到路径里
    // 获取 steam
    // const stream = await ctx.getFileStream();
    const readableStream = new Stream.Readable()
    readableStream._read = () => {}
    readableStream.push(jsCode)
    // 生成文件名
    filename = filename + '.js';
    // filename = filename + '-' + Date.now() + '-' + Number.parseInt(Math.random() * 10000) + '.js';
    console.log('--filename--', filename)
    // console.log('--baseDir--', this.config.baseDir)
    console.log('--dirname--', this.config.baseDir)
    // 写入路径
    const fileParentCatalog = 'app/public/upload/'
    const target = path.join(this.config.fileBaseDir, fileParentCatalog, filename);
    console.log('--target--', target)
    const writeStream = fs.createWriteStream(target, { flag: 'w' });
    try {
      // 写入文件
      // await awaitStreamReady(stream.pipe(writeStream));
      readableStream.pipe(writeStream)
      const { insertSuccess } = await ctx.service.news.storageCustomCode(jsCode);
      console.log('--controller-insertSuccess--', insertSuccess)
      // fs.writeFileSync(target, jsCode, { flag: 'w' })
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(writeStream);
      throw err;
    }
    let staticCodePath = this.config.serverBaseDir +  '/public/upload/' + filename;

    this.ctx.body = {
      status: 200,
      data: {
        user: '111',
        jsCode: jsCode,
        staticCodePath: staticCodePath
      },
      message: 'success'
    };
    this.ctx.status = 200;
  }
}

module.exports = PageController;
