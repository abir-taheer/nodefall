'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Rooms', 'password', Sequelize.STRING);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Rooms', 'password');
	}
};
