'use strict';

const { app } = require('./model');

const createApp = {
  createAppRequest: {
    appName: { ...app.appName, require: true },
    appDesc: { ...app.appDesc, require: true },
  }
}

module.exports = {
  ...createApp
};

