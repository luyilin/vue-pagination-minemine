const msg = require('./msg')

var ctrls = {}

ctrls.version = async function (ctx) {
  ctx.body = '0.0.1';
};

ctrls.msg = msg

module.exports = ctrls;
