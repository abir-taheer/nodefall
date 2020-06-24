const { players } = require('./../database');

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

		const player = await players.getById(socket.handshake.session.playerId);

		socket.join(player.roomId);

		require('./active')(socket, io);

		socket.emit('ready-to-listen');

		socket.on('disconnect', async () => {
			await player.update({ isActive: false });
			const allPlayers = await player.getAllPlayers();

			io.to(player.roomId).emit('updatePlayers', allPlayers);
		});
	});
};
