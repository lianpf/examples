// app/service/news.js

const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    const ctx = this.ctx;
    // 读配置
    const { serverUrl } = this.config.request;
    /**
     * @desc: request
     * @依赖: 1.http client to Post 2.hacker-news api(此处不可用，故用egg内mock api)
     */
     const result = await ctx.curl(`${serverUrl}/post`, {
    // const result = await ctx.curl(`${serverUrl}/post`, {
      // 必须指定 method
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      data: {
        hello: 'world',
        now: Date.now(),
      },
      // 3 秒超时
      timeout: 3000
    });
    return result
  }
  async storageUser(params) {
    // 连接db获取用户数据
    return new Promise((resolve, reject) => {
      try {
        const data = {
          name: '曜灵',
          motto: '带着偏见去看技术的世界'
        }
        resolve(data)
      } catch(e) {
        console.log(e)
        reject(e)
      }
    })
  }
}

module.exports = NewsService;