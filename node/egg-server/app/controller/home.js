'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Hi, welcome to Egg.js！';
  }
}

module.exports = HomeController;
