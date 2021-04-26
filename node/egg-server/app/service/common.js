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
  // 获取 custom-code
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
  // 1.更新/插入 custom-code 2.同步信息到assets/pages
  async updateCodeSyncPage(params) {
    const { insertNewCode, page_id, custom_code_id, filename, code, type } = params;
    // 创建事务是一个异步的过程，所以这里要加上 await，变量conn才能拿到创建好的事务
    const conn = await this.app.mysql.beginTransaction();
    // console.log('--insertCustomCode-000-conn--', conn)
    let codeResult = false
    let pageResult = false
    try {
      if (insertNewCode) {
        const result = await conn.insert('custom_code', {
          custom_code_id,
          code,
          filename,
          page_id
        })
        codeResult = result.affectedRows === 1
      } else {
        const result = await conn.update('custom_code', {
          code,
          filename,
          page_id
        }, {
          where: {
            custom_code_id
          }
        })
        codeResult = result.affectedRows === 1
      }
      if (type === 'page') {
        const result = await conn.update('pages', {
          custom_code_id
        }, {
          where: {
            page_id
          }
        })
        pageResult = result.affectedRows === 1
      } else if (type === 'assets') {
        const result = await conn.update('assets', {
          custom_code_id
        }, {
          where: {
            assets_id: page_id
          }
        })
        pageResult = result.affectedRows === 1
      }
      await conn.commit(); // 提交事务
    } catch (err) {
      // error, rollback —— 捕获异常后回滚事务！
      await conn.rollback();
      throw err;
    }
    // console.log('--insertCustomCode-conn--', conn)
    return codeResult && pageResult
  }
}

module.exports = CommonService;