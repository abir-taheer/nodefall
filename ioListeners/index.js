module.exports = io => {
	io.on('connection', async socket => {
		if (typeof socket.handshake.session.playerId !== 'number') {
			await socket.emit('appError', {
				message: 'You must join a room first.',
				code: 'NOT_IN_ROOM'
			});

			socket.disconnect();
			return;
		}

		const room = socket.handshake.session.room.publicId;
		socket.join(room);

		require('./active')(socket, io);
		require('./disconnect')(socket, io);
	});
};
