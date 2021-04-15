// DB select结果，数组转对象
const request = (ctx, options) => {
  // 读配置
  const { serverUrl } = this.config.request;
  const {
    url = '/post',
    method = 'get',
    contentType = 'json',
    data = {}
  } = options;
  /**
    * @desc: request
    * @依赖: 1.http client to Post 2.hacker-news api(此处不可用，故用egg内mock api)
    */
  const result = await ctx.curl(`${serverUrl}${url}`, {
    // 必须指定 method
    method,
    // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
    contentType,
    data,
    // 3 秒超时
    timeout: 3000
  });
  return result
}

module.exports = request;