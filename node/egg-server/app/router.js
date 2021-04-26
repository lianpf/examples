'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api', controller.api.list);
  router.post('/api/upload', controller.api.upload);
  // 应用模块
  router.get('/api/app/list', controller.app.list);
  router.get('/api/app/detail', controller.app.detail);
  // page 模块
  router.get('/api/page/list', controller.page.list);
  router.get('/api/page/detail', controller.page.detail);
  router.post('/api/page/upload-code', controller.page.uploadCode);
  // 资产模块
  router.get('/api/assets/list', controller.assets.list);
  router.post('/api/assets/create', controller.assets.create);
  router.get('/api/assets/brief-info', controller.assets.briefInfo);
  // util模块
  router.post('/api/upload/schema', controller.common.uploadSchema);
  router.post('/api/upload/code', controller.common.uploadCode);
  router.get('/api/custom-code/detail', controller.common.getCustomCode);
};
