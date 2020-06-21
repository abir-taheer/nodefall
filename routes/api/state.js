const router = require('express').Router();
const { Rooms, Players } = require('./../../database');

router.get('/', async (req, res) => {
	let inRoom = false;
	const playerID = req.session.playerID;

	// If the playerID is set, check to make sure that the room is still occupied
	if (typeof playerID === 'number') {
		const player = await Players.findOne({ where: { id: playerID } });
		const room = await player.getRoom();
		if (room.isActive) {
			const games = room.getGames({ sort: ['createdAt', 'DESC'] });
		} else {
			inRoom = false;
			delete req.session.playerID;
		}
	}
});

module.exports = router;
