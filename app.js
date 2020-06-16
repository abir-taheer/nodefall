const database = require('./database');
const opengraph = require('./opengraph');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const ioListeners = require('./ioListeners');
const shared_session = require('express-socket.io-session');
const morgan = require('morgan');
const expressSession = require('express-session');
const SequelizeConnectSession =
    require('connect-session-sequelize')(expressSession.Store);
const sequelizeStore = new SequelizeConnectSession({db : database.sequelize});

const sessionSecret =
    process.env.SESSION_SECRET || 'some_semi_permanent_secret';

const session = expressSession({
  secret : sessionSecret,
  name : 'session',
  resave : true,
  saveUninitialized : false,
  store : sequelizeStore,
  cookie :
      {path : '/', httpOnly : true, secure : false, maxAge : 7 * 86400 * 1000},
  rolling : true
});

sequelizeStore.sync();

app.use(session);
app.use(cookieParser(sessionSecret));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan(process.env.MORGAN_FORMAT || 'dev',
               {skip : (req, res) => res.statusCode < 400}));

io.set('transports'['websocket']);
io.use(shared_session(session, undefined, {autosave : true}));
ioListeners(io);
app.use(opengraph);

// ROUTES
app.use('/', require('./routes'));

module.exports = app;
