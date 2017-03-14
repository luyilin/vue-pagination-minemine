var uuid = require('uuid/v1'),
    db   = require('../../db/lowdb'),
    msg  = {};

import {ajaxReturn} from '../../middlewares/filter'

// /msg/list
async function getMsg(ctx) {
  let offset  = ctx.query.offset || 0,
      limit   = ctx.query.limit || 1;

  let msgs = db.get('msgs'),
      reply_msgs = db.get('reply_msgs');

  ajaxReturn(ctx, {
    levelNum: msgs.size().value(),
    num: msgs.size().value() + reply_msgs.size().value(),
    data: msgs.orderBy('time', 'desc')
  })
}

// /msg/msglist
async function getMsgsMsg(ctx) {
  let msgs = db.get('reply_msgs');

  ajaxReturn(ctx, {
    data: msgs.orderBy('time', 'asc').value()
  })
}

// /msg/add
async function addMsg(ctx) {
  let query  = ctx.request.body,
      author = query.author,
      msg    = query.msg,
      email  = query.email;

  let msgs = db.get('msgs'),
    reply_msgs = db.get('reply_msgs');

  let add = msgs.push({
      id: uuid().substr(0, 8),
      author: author,
      email: email,
      msg: msg,
      time: Date.now()
    }).last()
    .write();

  ajaxReturn(ctx, {
    levelNum: msgs.size().value(),
    num: msgs.size().value() + reply_msgs.size().value(),
    data: add
  })
}

// /msg/reply
async function replyMsg(ctx) {
  let query  = ctx.request.body,
      fa_id = query.father_id,
      fa_author = query.father_author,
      author = query.reply_author,
      msg    = query.reply_msg,
      email  = query.reply_email;

  let msgs = db.get('reply_msgs'),
    reply_msgs = db.get('reply_msgs');

  let add = msgs.push({
    father_id: fa_id,
    father_author: fa_author,
    id: uuid().substr(0, 8),
    reply_author: author,
    reply_email: email,
    reply_msg: msg,
    time: Date.now()
  }).last()
    .write();

  ajaxReturn(ctx, {
    num: msgs.size().value() + reply_msgs.size().value(),
    data: add
  })
}

msg.getMsg     = getMsg;
msg.getMsgsMsg = getMsgsMsg;
msg.addMsg     = addMsg;
msg.reply      = replyMsg;

module.exports = msg;
