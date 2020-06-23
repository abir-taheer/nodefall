const router = require('express').Router();
const { players } = require('./../database');

router.use(async (req, res, next) => {
	const playerId = req.session.playerId;

	if (typeof playerId === 'number') {
		req.player = await players.findOne({ where: { id: playerId } });
		req.room = await req.player.getRoom();
		req.inRoom = await req.room.getIsActive();

		if (!req.inRoom) {
			delete req.session.playerId;
			delete req.player;
			delete req.room;
		}
	}

	next();
});

module.exports = router;
