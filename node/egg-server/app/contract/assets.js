'use strict';

const { app, assets } = require('./model');

const createAssets = {
  createAssetsRequest: {
    appId: { ...app.appId, require: true },
    assetsName: { ...assets.assetsName, require: true },
    assetsDesc: { ...assets.assetsDesc, require: true },
  }
}

module.exports = {
  ...createAssets
};
