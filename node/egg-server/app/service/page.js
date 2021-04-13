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
  async detail(params) {
    const { page_id } = params;
    const result = await this.app.mysql.select('pages', {
      where: { page_id },
      columns: ['page_id', 'page_name', 'app_id', 'drag_platform_path', 'create_date', 'schema_id', 'custom_code_id']
    });
    return result
  }
  async schema(params) {
    const { page_id, schema_id } = params;
    const result = await this.app.mysql.select('configs_schema', {
      where: { schema_id, page_id },
      columns: ['schema_content']
    });
    return result
  }
  async customCode(params) {
    const { page_id, custom_code_id } = params;
    const result = await this.app.mysql.select('custom_code', {
      where: { custom_code_id, page_id },
      columns: ['code']
    });
    return result
  }
}

module.exports = PageService;