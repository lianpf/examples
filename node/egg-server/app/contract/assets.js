'use strict';

const { app, assets } = require('./model');
const { baseResponse } = require('./index');

const createAssets = {
  createAssetsRequest: {
    assetsName: { ...assets.assetsName, require: true },
    assetsDesc: { ...assets.assetsDesc, require: true },
  }
}

const assetsDetail = {
  assetsBriefInfoResponse: {
    ...baseResponse,
    data: {
      ...baseResponse.data,
      type: 'assetsRes'
    }
  }
}

const assetsList = {
  assetsListResponse: {
    ...baseResponse,
    data: {
      type: 'array',
      itemType: 'assetsRes'
    }
  }
}

module.exports = {
  ...createAssets,
  ...assetsDetail,
  ...assetsList
};
