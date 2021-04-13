// app/service/news.js

const Service = require('@lianpf/apr').Service;

class CodeService extends Service {
  async storageCustomCode() {
    // 连接db获取用户数据
    const result = await this.app.mysql.get('custom_code', { id: 11 });
    // console.log('--storageCustomCode-result--', result)
    return result;
  }
}

module.exports = CodeService;