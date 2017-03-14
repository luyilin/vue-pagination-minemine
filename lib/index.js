'use strict';

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static-server');
const cors = require('koa-cors');

app.use(cors());

app.use(bodyParser());

require('./routes')(app);

app.use(serve({rootDir: 'doc'}));

app.listen(3003);

console.log(`\nListening at http://localhost:3003\n`)
