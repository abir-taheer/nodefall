'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const rooms = sequelize.define(
		'rooms',
		{
			name: DataTypes.STRING,
			publicId: DataTypes.STRING,
			isActive: DataTypes.BOOLEAN,
			password: DataTypes.STRING
		},
		{}
	);
	rooms.associate = function (models) {
		// associations can be defined here
		rooms.hasMany(models.players);
		rooms.hasMany(models.games);
	};

	rooms.prototype.getIsActive = async function () {
		if (!this.isActive) {
			return false;
		}

		const games = await this.getGames({ sort: ['createdAt', 'DESC'] });

		const maxAge = 1000 * 60 * 60 * 6;
		const now = new Date();
		let roomExpiration;

		// Expiration is the last time a change was made to the room
		if (games.length > 0) {
			const mostRecentGame = games[0];
			roomExpiration = new Date(
				mostRecentGame.updatedAt.getTime() + maxAge
			);
		} else {
			roomExpiration = new Date(this.updatedAt.getTime() + maxAge);
		}

		if (now >= roomExpiration) {
			this.update({ isActive: false });
			return false;
		}

		// If the room is past the expiration time: return false
		return true;
	};

	rooms.prototype.checkPassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	};

	return rooms;
};
