'use strict';
module.exports = (sequelize, DataTypes) => {
	const Rooms = sequelize.define(
		'Rooms',
		{
			name: DataTypes.STRING,
			publicID: DataTypes.STRING,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	Rooms.associate = function (models) {
		// associations can be defined here
		Rooms.hasMany(models.Players);
		Rooms.hasMany(models.Games);
	};

	Rooms.prototype.getIsActive = async () => {
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

	return Rooms;
};
