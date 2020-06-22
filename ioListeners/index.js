module.exports = io => {
	let interval;
	io.on('connection', socket => {
		interval = setInterval(() => {
			socket.emit('message', 'still here!');
		}, 1000);

		socket.on('disconnect', () => {
			clearInterval(interval);
		});
	});
};
