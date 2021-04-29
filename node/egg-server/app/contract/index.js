'use strict';

const { page, configsSchema, customCode, common } = require('./model');

const baseResponse = {
  status: { type: 'integer', required: true, example: 200 },
  code: { type: 'integer', required: true, example: 0 },
  data: { type: 'object', example: {}, required: false },
  message: { type: 'string', example: '请求成功' },
}

const commonModule = {
  uploadSchemaRequest: {
    pageId: { ...page.pageId, description: '页面或资产唯一标识', require: true },
    schemaId: { ...configsSchema.schemaId, description: '配置Schema唯一标识(无则创建，有则更新)', require: true },
    schema: { ...configsSchema.schemaContent, require: true },
    type: { ...common.type, require: true }
  },
  uploadCodeRequest: {
    pageId: { ...page.pageId, description: '页面或资产唯一标识', require: true },
    customCodeId: { ...customCode.customCodeId, require: true },
    jsCode: { ...customCode.code, require: true },
    type: { ...common.type, require: true }
  },
  customCodeDetailResponse: {
    ...baseResponse,
    data: {
      type: 'customCode'
    }
  }
}

module.exports = {
  baseRequest: {
    appId: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  baseResponse: baseResponse,
  ...commonModule
};
