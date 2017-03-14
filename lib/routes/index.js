'use strict';

const router = require('koa-router')();
const ctrls = require('../controllers');
const filter = require('../middlewares/filter');

module.exports = (app) => {
  router.get('/', async(ctx) => {
    ctx.body = '您已开启了洪荒之力~';
  });

  router.get('/version', ctrls.version);

  router.get('/msg/list', ctrls.msg.getMsg);
  router.get('/msg/msglist', ctrls.msg.getMsgsMsg);

  router.post('/msg/add', ctrls.msg.addMsg);

  router.post('/msg/reply', ctrls.msg.reply);

  app.use(router.routes());
};
