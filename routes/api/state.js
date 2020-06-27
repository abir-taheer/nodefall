const router = require('express').Router();

router.get('/', async (req, res) => {
	if (req.inRoom) {
		const { player, room } = req;

		res.json({
			success: true,
			payload: {
				inRoom: true,
				player: {
					name: player.name,
					room: {
						publicId: room.publicId,
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
