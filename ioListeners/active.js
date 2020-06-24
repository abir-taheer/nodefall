const { players } = require('./../database');

module.exports = (socket, io) => {
	socket.on('active', async () => {
		const player = await players.getById(socket.handshake.session.playerId);

		await player.update({
			isActive: true
		});

		const allPlayers = await player.getAllPlayers();

		io.to(player.roomId).emit('updatePlayers', allPlayers);
	});
};
