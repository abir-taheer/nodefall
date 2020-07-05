require('express-async-errors');
const path = require('path');
const bodyParser = require('body-parser');
const sessionSecret =
	process.env.SESSION_SECRET || 'some_semi_permanent_secret';
const cookieParser = require('cookie-parser')(sessionSecret);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const ioListeners = require('./ioListeners');
const shared_session = require('express-socket.io-session');
const morgan = require('morgan');
const session = require('./middleware/session');

const redisUrl = process.env.REDIS_URL;
if (redisUrl) {
	const redis = require('redis');
	const redisAdapter = require('socket.io-redis');
	const pub = redis.createClient(redisUrl);
	const sub = redis.createClient(redisUrl);
	io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));
}

app.use(session);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	morgan(process.env.MORGAN_FORMAT || 'dev', {
		skip: (req, res) => res.statusCode < 400
	})
);

io.set('transports', ['websocket']);
io.use(shared_session(session, cookieParser, { autosave: true }));
ioListeners(io);

// ROUTES
app.use('/', require('./routes'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('./client/build'));
	app.get('*', (req, res) =>
		res.sendFile(path.resolve('./client/build/index.html'))
	);
}

module.exports = server;
