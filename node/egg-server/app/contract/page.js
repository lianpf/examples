'use strict';

const { app, page, customCode } = require('./model');

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

module.exports = {
  ...createPage,
  ...pageCode
};
