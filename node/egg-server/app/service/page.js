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
      columns: ['code', 'filename']
    });
    return result
  }
  async updateCustomCode(params) {
    const { code, custom_code_id } = params;
    const result = await this.app.mysql.update('custom_code', {
      code: code
    }, {
      where: {
        custom_code_id
      }
    });
    return result.affectedRows === 1;
  }
  /**
   * @desc: 使用"事务" 插入 custom_code，更新 pages
   * */
  async insertCustomCode(params) {
    const { page_id, custom_code_id, filename, code } = params;
    // 创建事务是一个异步的过程，所以这里要加上 await，变量conn才能拿到创建好的事务
    const conn = await this.app.mysql.beginTransaction();
    console.log('--insertCustomCode-000-conn--', conn)
    try {
      await conn.insert('custom_code', {
        custom_code_id,
        code,
        filename,
        page_id
      })
      await conn.update('pages', {
        custom_code_id
      }, {
        where: {
          page_id
        }
      })
      await conn.commit(); // 提交事务
    } catch (err) {
      // error, rollback —— 捕获异常后回滚事务！
      await conn.rollback();
      throw err;
    }
    console.log('--insertCustomCode-conn--', conn)
    // return result
  }
  async update() {
    const { page_id } = params;
    const result = await this.app.mysql.update('pages', params, {
      where: {
        page_id
      }
    });
    return result
  }
}

module.exports = PageService;