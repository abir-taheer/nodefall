'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('rooms', 'password', Sequelize.STRING);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('rooms', 'password');
	}
};
