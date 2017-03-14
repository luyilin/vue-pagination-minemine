var low  = require('lowdb'),
    uuid = require('uuid/v1');

var pathToDbFile = 'db.json';

if (typeof __dirname !== 'undefined') {
  var path = require('path');
  pathToDbFile = path.join(__dirname, pathToDbFile);
}
var db = low(pathToDbFile);

let uu = uuid().substr(0, 8);

db.defaults({
  msgs: [{
    id: uu,
    author: 'yilin',
    email: 'the@one',
    msg: '沙花',
    time: Date.now(),
  }],
  reply_msgs: [{
    father_id: uu,
    father_author: 'yilin',
    id: uuid().substr(0, 8),
    reply_author: '女神',
    reply_email: 'the@one',
    reply_msg: '板凳',
    time: Date.now()
  }]
}).write();

module.exports = db;
