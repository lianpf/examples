'use strict';

module.exports = {
  createAppDetailRequest: {
    appId: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  baseRequest: {
    appId: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  baseResponse: {
    status: { type: 'integer', required: true, example: 200 },
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'object', example: {} },
    message: { type: 'string', example: '请求成功' },
  },
};
