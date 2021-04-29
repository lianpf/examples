'use strict';

const { app, page, customCode, configsSchema } = require('./model');
const { baseResponse } = require('./index');

const createPage = {
  createPageRequest: {
    appId: { ...app.appId, require: true },
    pageName: { ...page.pageName, require: true }
  }
}

const pageCode = {
  pageCodeRequest: {
    appId: { ...app.appId, require: true },
    jsCode: { ...customCode.code, require: true }
  }
}

const pageList = {
  pageListResponse: {
    ...baseResponse,
    data: {
      type: 'array',
      itemType: 'pageRes'
    }
  }
}

const composePageDetail_0 = {
  ...page,
  appId: app.appId,
  schemaId: configsSchema.schemaId,
  customCodeId: customCode.customCodeId
}
const composePageDetail = {
  detail: {
    type: 'composePageDetail_0'
  },
  schema: configsSchema.schemaContent,
  customCode: customCode.code
}
const pageDetail = {
  pageDetailResponse: {
    ...baseResponse,
    data: {
      type: 'composePageDetail'
    }
  },
  pageBriefInfoResponse: {
    ...baseResponse,
    data: {
      type: 'pageRes'
    }
  }
}

module.exports = {
  composePageDetail_0: composePageDetail_0,
  composePageDetail: composePageDetail,
  ...createPage,
  ...pageCode,
  ...pageList,
  ...pageDetail
};
