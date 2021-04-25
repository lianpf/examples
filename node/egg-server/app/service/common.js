const Service = require('egg').Service;
const { getObj, getUuid } = require('../utils/utils.js');

class CommonService extends Service {
  // 查找某一条schema
  async lookupSchema(params) {
    let { schema_id, schema_content, page_id } = params;
    const conn = await this.app.mysql.beginTransaction();
    let processSuccess = false // 事务结果
    try {
      const queryRes = await conn.select('configs_schema', {
        where: {
          schema_id
        }
      });
      if (queryRes.length > 0) {
        const result = await conn.update('configs_schema', {
          schema_content
        }, {
          where: {
            schema_id
          }
        });
        processSuccess = result.affectedRows === 1
      } else {
        const temp_schema_id = `schema-${getUuid()}`
        const result = await conn.insert('configs_schema', {
          schema_id: temp_schema_id,
          schema_content,
          page_id
        })
        processSuccess = result.affectedRows === 1
        if (processSuccess) schema_id = temp_schema_id
      }
      await conn.commit(); // 提交事务
    } catch (err) {
      // error, rollback —— 捕获异常后回滚事务！
      await conn.rollback();
      throw err;
    }
    return {
      success: processSuccess,
      schema_id
    }
  }
  async getCustomCode(params) {
    let { custom_code_id } = params;
    const result = await this.app.mysql.select('custom_code', {
      where: {
        custom_code_id
      },
      columns: ['custom_code_id', 'filename', 'page_id']
    });
    return result
  }
}

module.exports = CommonService;