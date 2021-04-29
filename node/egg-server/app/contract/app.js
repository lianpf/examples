'use strict';

const { app } = require('./model');
const { baseResponse } = require('./index');

const createApp = {
  createAppRequest: {
    appName: { ...app.appName, require: true },
    appDesc: { ...app.appDesc, require: true },
  }
}

const appList = {
  appListResponse: {
    ...baseResponse,
    data: {
      type: 'array',
      itemType: 'app'
    }
  }
}

const appDetail = {
  appDetailResponse: {
    ...baseResponse,
    data: {
      ...baseResponse.data,
      type: 'app'
    }
  }
}

module.exports = {
  ...createApp,
  ...appList,
  ...appDetail
};

