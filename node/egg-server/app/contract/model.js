const app = {
  appId: { type: 'string', description: '应用唯一标识', example: 'oa-1617694270763-206276' },
  appName: { type: 'string', description: '应用名称', example: 'oa' },
  appDesc: { type: 'string', description: '应用描述', example: 'oa应用描述' },
  createDate: { type: 'datetime', description: '创建时间', example: '2021-04-06T07:39:21.000Z' },
}
const page = {
  pageId: { type: 'string', description: '页面唯一标识', example: 'oa-leave-1617694433000-206276' },
  pageName: { type: 'string', description: '页面名称', example: 'leave（请假申请单）' },
  dragPlatformPath: { type: 'string', description: '配置地址', example: "/configs?type=page" },
  createDate: { type: 'datetime', description: '创建时间', example: '2021-04-06T07:39:21.000Z' },
}
const assets = {
  assetsId: { type: 'string', description: '资产唯一标识', example: 'assets-network-1619145506341-924012' },
  assetsName: { type: 'string', description: '资产名称', example: '网点' },
  assetsDesc: { type: 'string', description: '资产描述', example: '网点资产描述' },
}
const schema = {
  schemaId: { type: 'string', description: '配置Schema上传记录id', example: 'schema-1619331237130-957395' },
  schemaContent: { type: 'string', description: '配置Schema', example: '{"type":"page","body":[{"type":"button","label":"按钮"},{"type":"tpl","tpl":"请编辑内容","inline":false}]}' },
}
const customCode = {
  customCodeId: { type: 'string', description: '自定义js文件唯一标识', example: 'page-custom-code-1619406805726-150183' },
  code: { type: 'string', description: '自定义jsCode', example: 'function click(param) { return param }' },
  filename: { type: 'string', description: 'code资源地址', example: 'http://10.10.139.24:7001/public/upload/leave-code-1617256296270-9513.js' }
}
const common = {
  type: { type: 'string', description: '类型', required: true, enum:['page', 'assets'], example: 'page' },
}


/**
 * @desc: compose
 *  */
 const composePageReq = Object.assign({}, {
  pageId: page.pageId,
  pageName: page.pageName
 }, {
  type: common.type
})
const composePageRes = Object.assign({}, page, {
  appId: app.appId,
  schemaId: schema.schemaId,
  customCodeId: customCode.customCodeId
})
const composeAssetsReq = Object.assign({}, assets, {
  type: common.type
})

const customCodeRes = Object.assign({}, customCode, {
  pageId: page.pageId
})

module.exports = {
  app: app,
  page: page,
  pageReq: composePageReq,
  pageRes: composePageRes,
  assets: composeAssetsReq,
  assetsRes: assets,
  configsSchema: schema,
  customCode: customCodeRes,
  common: common
};