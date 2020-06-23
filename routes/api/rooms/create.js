const router = require('express').Router();
const RequestRefusalError = require('./../../../utils/RequestRefusalError');
const { rooms, players } = require('./../../../database');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');

router.post('/', async (req, res) => {
	const playerId = req.session.playerId;
	if (req.inRoom) {
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
			'INVALId_FIELDS'
		);
	}

	if (roomName.length > 64 || playerName.length > 64) {
		throw new RequestRefusalError(
			'Room name and player name cannot be longer than 64 characters',
			'INVALId_FIELDS'
		);
	}

	if (password) {
		password = await bcrypt.hash(password, 12);
	}

	const publicIdLen = Math.floor(Math.random() * 4) + 6;

	const publicId = cryptoRandomString({
		length: publicIdLen,
		type: 'distinguishable'
	});

	const room = await rooms.create({
		publicId,
		name: roomName,
		isActive: true,
		password
	});

	const player = await players.create({
		name: playerName,
		roomId: room.id,
		isOwner: true,
		isActive: false
	});

	req.session.playerId = player.id;

	res.json({
		success: true,
		payload: {
			room: {
				name: room.name,
				publicId
			}
		}
	});
});

module.exports = router;
