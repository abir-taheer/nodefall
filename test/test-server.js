const app = require('./../app');

describe('app', () => {
	it('server runs without error', () => {
		let server;
		try {
			server = app.listen(process.env.PORT || 3001);
		} finally {
			server.close();
		}
	});
});
