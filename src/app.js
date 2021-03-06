'use strict';
import NeDB from 'nedb';
const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');const primus = require('feathers-primus');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

const db = new NeDB({
  filename: './db-data/messages',
  autoload: true
});

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use('/:model', fuction(){

  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(primus({ transformer: 'websockets' }))
  .configure(services)
  .configure(middleware);

module.exports = app;
