'use strict';

const responseObj = {
  appName: { type: 'string', required: false, example: 'app-oa' },
  appDesc: { type: 'string', required: false, example: 'OA 流程应用' },
  createDate: { type: 'string', example: '2021-04-06T07:39:21.000Z' }
}

module.exports = {
  createAppDetailRequest: {
    appId: { type: 'string', description: 'id 唯一键', required: true, example: '1' },
  },
  responseObj
};

