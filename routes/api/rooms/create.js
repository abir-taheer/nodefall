const router = require('express').Router();
const RequestRefusalError = require('./../../../utils/RequestRefusalError');
const { Rooms, Players } = require('./../../../database');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');

router.post('/', async (req, res) => {
	const playerID = req.session.playerID;
	if (typeof playerID === 'number') {
		throw new RequestRefusalError(
			'You are already part of another room.',
			'ALREADY_IN_ROOM'
		);
	}

	const roomName = req.body.roomName || '';
	const playerName = req.body.playerName || '';
	let password = req.body.password || null;

	if (!roomName || !playerName) {
		throw new RequestRefusalError(
			'Room name and player name cannot be left empty.',
			'INVALID_FIELDS'
		);
	}

	if (roomName.length > 64 || playerName.length > 64) {
		throw new RequestRefusalError(
			'Room name and player name cannot be longer than 64 characters',
			'INVALID_FIELDS'
		);
	}

	if (password) {
		password = await bcrypt.hash(password, 12);
	}

	const publicIDLen = Math.floor(Math.random() * 4) + 6;

	const publicID = cryptoRandomString({
		length: publicIDLen,
		type: 'distinguishable'
	});

	const room = await Rooms.create({
		publicID,
		name: roomName,
		isActive: true,
		password
	});

	const player = await Players.create({
		name: playerName,
		roomID: room.id,
		isOwner: true,
		isActive: false
	});

	req.session.playerID = player.id;

	res.json({
		success: true,
		payload: {
			room: {
				name: room.name,
				publicID
			}
		}
	});
});

module.exports = router;
