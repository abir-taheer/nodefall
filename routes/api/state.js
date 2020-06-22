const router = require('express').Router();
const { Players, Rooms } = require('./../../database');

router.get('/', async (req, res) => {
	let player, room;
	let inRoom = false;
	const playerID = req.session.playerID;

	// If the playerID is set, check to make sure that the room is still occupied
	if (typeof playerID === 'number') {
		player = await Players.findOne({ where: { id: playerID } });
		room = await Rooms.findOne({ where: { id: player.roomID } });
		const isActive = await room.getIsActive();

		inRoom = isActive;

		if (!isActive) {
			delete req.session.playerID;
		}
	}

	if (inRoom) {
		res.json({
			success: true,
			payload: {
				inRoom: true,
				player: {
					name: player.name,
					room: {
						publicID: room.publicID,
						name: room.name,
						isOwner: player.isOwner
					}
				}
			}
		});
	} else {
		res.json({
			success: true,
			payload: {
				inRoom: false
			}
		});
	}
});

module.exports = router;
