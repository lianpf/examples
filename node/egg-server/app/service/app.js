const Service = require('egg').Service;

class AppService extends Service {
  async create(params) {
    console.log('-app-create-params-', params)
    const result = await this.app.mysql.insert('applications', {
      ...params
    });
    return result
  }
  async list() {
    const result = await this.app.mysql.select('applications', {
      columns: ['app_id', 'app_name', 'app_desc', 'create_date']
    });
    return result
  }
  async detail(appId) {
    const result = await this.app.mysql.select('applications', {
      where: { app_id: appId },
      columns: ['app_name', 'app_desc', 'create_date']
    });
    return result
  }
}

module.exports = AppService;