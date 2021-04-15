'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api', controller.api.list);
  router.post('/api/upload', controller.api.upload);
  router.get('/api/app/list', controller.app.list);
  router.get('/api/app/detail', controller.app.detail);
  router.get('/api/page/list', controller.page.list);
  router.get('/api/page/detail', controller.page.detail);
  router.post('/api/page/upload-code', controller.page.uploadCode);
};
