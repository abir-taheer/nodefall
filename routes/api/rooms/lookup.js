const router = require('express').Router({ mergeParams: true });
const { Rooms } = require('./../../../database');
router.get('/', async (req, res) => {
	const { publicId } = req.params;

	const room = await Rooms.findOne({ where: { publicId } });

	if (room) {
		const hasPassword = room.password !== null;

		res.json({
			success: true,
			payload: {
				publicId: room.publicId,
				name: room.name,
				hasPassword,
				isActive: await room.getIsActive()
			}
		});
	} else {
		res.status(404).json({
			success: false,
			error: {
				message: 'There is no room with that Id',
				code: 'ROOM_NOT_FOUND'
			}
		});
	}
});

module.exports = router;
