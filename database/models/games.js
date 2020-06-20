'use strict';
module.exports = (sequelize, DataTypes) => {
	const Games = sequelize.define(
		'Games',
		{
			locationID: DataTypes.INTEGER,
			roomID: DataTypes.INTEGER
		},
		{}
	);
	Games.associate = function (models) {
		// associations can be defined here
	};
	return Games;
};
