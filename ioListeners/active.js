const { players } = require('./../database');

module.exports = (socket, io) => {
	socket.on('active', async () => {
		const player = await players.getById(socket.handshake.session.playerId);
		player.isActive = true;
		await player.save();

		const allPlayers = await player.getAllPlayers();

		const room = socket.handshake.session.room.publicId;
		io.to(room).emit('updatePlayers', allPlayers);
	});
};
