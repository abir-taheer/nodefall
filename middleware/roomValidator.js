const router = require('express').Router();
const { Players, Rooms } = require('./../database');

router.use(async (req, res, next) => {
	const playerId = req.session.playerId;

	if (typeof playerId === 'number') {
		req.player = await Players.findOne({ where: { id: playerId } });
		req.room = await Rooms.findOne({ where: { id: req.player.roomId } });
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
