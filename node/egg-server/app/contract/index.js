'use strict';

const { page, configsSchema, customCode } = require('./model');

const commonModule = {
  uploadSchemaRequest: {
    pageId: { ...page.pageId, description: '页面或资产唯一标识', require: true },
    schemaId: { ...configsSchema.schemaId, description: '配置Schema唯一标识(无则创建，有则更新)', require: true },
    schema: { ...configsSchema.schemaContent, require: true },
    type: { ...page.type, require: true }
  },
  uploadCodeRequest: {
    pageId: { ...page.pageId, description: '页面或资产唯一标识', require: true },
    customCodeId: { ...customCode.customCodeId, require: true },
    jsCode: { ...customCode.code, require: true },
    type: { ...page.type, require: true }
  }
}

module.exports = {
  baseRequest: {
    appId: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  baseResponse: {
    status: { type: 'integer', required: true, example: 200 },
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'object', example: {} },
    message: { type: 'string', example: '请求成功' },
  },
  ...commonModule
};
