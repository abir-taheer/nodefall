const { players } = require('./../database');

module.exports = (socket, io) => {
	const room = socket.handshake.session.room.publicId;

	socket.on('disconnect', async () => {
		const player = await players.getById(socket.handshake.session.playerId);
		player.isActive = false;
		await player.save();
		const allPlayers = await player.getAllPlayers();
		io.to(room).emit('updatePlayers', allPlayers);
	});
};
