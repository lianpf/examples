const Service = require('egg').Service;

class PageService extends Service {
  async list(params) {
    const { app_id } = params;
    const result = await this.app.mysql.select('pages', {
      where: { app_id },
      columns: ['page_id', 'page_name', 'app_id', 'drag_platform_path', 'create_date']
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

module.exports = PageService;