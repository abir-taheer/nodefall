'use strict';
module.exports = (sequelize, DataTypes) => {
	const Games = sequelize.define(
		'Games',
		{
			gameID: DataTypes.INTEGER,
			name: DataTypes.STRING,
			publicID: DataTypes.STRING,
			locationID: DataTypes.INTEGER
		},
		{}
	);
	Games.associate = function (models) {
		// associations can be defined here
	};
	return Games;
};
