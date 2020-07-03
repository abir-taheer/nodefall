'use strict';
module.exports = (sequelize, DataTypes) => {
	const players = sequelize.define(
		'players',
		{
			name: DataTypes.STRING,
			roomId: DataTypes.INTEGER,
			isOwner: DataTypes.BOOLEAN,
			isActive: DataTypes.BOOLEAN
		},
		{}
	);
	players.associate = function (models) {
		// associations can be defined here
		players.belongsTo(models.rooms);
		players.hasMany(models.gameroles);
	};

	players.prototype.getAllPlayers = async function () {
		return players.findAll({
			where: {
				roomId: this.roomId
			}
		});
	};

	players.getById = async id => {
		return players.findOne({ where: { id } });
	};

	return players;
};
