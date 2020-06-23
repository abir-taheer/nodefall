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

		const player = await players.findOne({
			where: { id: socket.handshake.session.playerId }
		});

		const room = await player.getRoom();

		const publicID = room.socket.join(room.publicId);

		const emitPlayerList = async () => {
			const playerList = await room.getPlayers({
				attributes: ['name', 'isActive', 'isOwner']
			});

			io.to(room.publicId).emit('updatePlayers', playerList);
		};

		require('./active')(socket, player, emitPlayerList);

		socket.on('disconnect', async () => {
			await player.update({ isActive: false });
			await emitPlayerList();
		});
	});
};
