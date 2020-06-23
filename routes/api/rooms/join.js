const router = require('express').Router({ mergeParams: true });
const RequestRefusalError = require('./../../../utils/RequestRefusalError');
const { Rooms, Players } = require('./../../../database');

router.post('/', async (req, res) => {
	// Anti-spam
	if (req.session.lastTriedPass) {
		const now = new Date().getTime();
		const lastTriedTime = new Date(req.session.lastTriedPass).getTime();

		if (now - lastTriedTime < 1000) {
			throw new RequestRefusalError(
				'Please wait at least one second before trying another password',
				'ATTEMPT_TIMEOUT'
			);
		}
	}

	if (req.inRoom) {
		throw new RequestRefusalError(
			'You are already part of another room.',
			'ALREADY_IN_ROOM'
		);
	}

	const name = req.body.name || '';
	const password = req.body.password || '';

	if (!name) {
		throw new RequestRefusalError(
			'You must provide a name to join the room',
			'INVALID_NAME'
		);
	}

	const { publicID } = req.params;

	const room = await Rooms.findOne({ where: { publicID } });

	let isValid = room && (await room.getIsActive());

	if (!isValid) {
		throw new RequestRefusalError(
			'There is no room with that ID.',
			'ROOM_NOT_FOUND'
		);
	}

	const correctPassword =
		room.password === null || (await room.checkPassword(password));

	if (!correctPassword) {
		req.session.lastTriedPass = new Date().toISOString();

		throw new RequestRefusalError(
			'That password is not valid.',
			'INVALID_PASSWORD'
		);
	}

	// Now that they've passed the checks, add them to the room
	const player = await Players.create({
		name,
		roomID: room.id,
		isOwner: false,
		isActive: false
	});

	req.session.playerID = player.id;

	res.json({
		success: true,
		payload: {
			player: {
				id: player.id,
				name: player.name,
				room: {
					publicID
				}
			}
		}
	});
});

module.exports = router;
