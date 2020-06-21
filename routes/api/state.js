const router = require('express').Router();
const { Rooms, Players } = require('./../../database');

router.get('/', async (req, res) => {
	const playerID = req.session.playerID;

	if (typeof playerID !== 'number') {
		res.json({
			success: true,
			payload: {
				inRoom: false
			}
		});
	} else {
		const player = await Players.findOne({ where: { id: playerID } });
		const room = await player.getRoom();

		res.json({
			success: true,
			payload: {
				inRoom: true,
				player: {
					name: player.name,
					isOwner: player.isOwner,
					room: {
						name: room.name,
						publicID: room.publicID
					}
				}
			}
		});
	}
});

module.exports = router;
