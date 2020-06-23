module.exports = (socket, player, emitPlayers) => {
	socket.on('active', async () => {
		await player.update({
			isActive: true
		});

		emitPlayers();
	});
};
