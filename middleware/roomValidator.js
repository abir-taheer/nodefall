const router = require('express').Router();
const { Players, Rooms } = require('./../database');

router.use(async (req, res, next) => {
	const playerID = req.session.playerID;

	if (typeof playerID === 'number') {
		req.player = await Players.findOne({ where: { id: playerID } });
		req.room = await Rooms.findOne({ where: { id: req.player.roomID } });
		req.inRoom = await req.room.getIsActive();

		if (!req.inRoom) {
			delete req.session.playerID;
			delete req.player;
			delete req.room;
		}
	}

	next();
});

module.exports = router;
