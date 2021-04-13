const Service = require('egg').Service;

class AppService extends Service {
  async list() {
    const result = await this.app.mysql.get('applications');
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