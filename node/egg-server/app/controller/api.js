'use strict';

const Controller = require('egg').Controller;

const requestData = (params) => {
  console.log('--requestData-params--', params)
  return new Promise((resolve, reject) => {
    try {
      const data = {
        list: [
          { id: 1, title: 'news 1', url: '/news/1' },
          { id: 2, title: 'news 2', url: '/news/2' }
        ]
      }
      resolve(data)
    } catch(e) {
      console.log(e)
      reject(e)
    }
  })
} 

class ApiController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list() {
    const { ctx } = this;
    const { uid: id = '001', page: tag = 'home' } = ctx.query;
    let params = {id, tag}
    const dataList = await requestData(params)
    ctx.body = dataList.list;
  }
  async upload() {
    const { ctx } = this;
    const { uid: id = '001', page: tag = 'home' } = ctx.query;
    let params = {id, tag}
    const dataList = await requestData(params)
    ctx.body = dataList.list;
  }
}

module.exports = ApiController;
