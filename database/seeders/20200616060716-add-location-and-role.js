'use strict';
const now = new Date();
module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
		return queryInterface
			.bulkInsert('locations', [
				{
					locationId: 10,
					name: 'High School',
					createdAt: now,
					updatedAt: now
				}
			])
			.then(() => {
				return queryInterface.bulkInsert('roles', [
					{
						roleId: 100,
						name: 'Janitor',
						LocId: 10,
						createdAt: now,
						updatedAt: now
					}
				]);
			});
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

		return queryInterface.bulkDelete('Location', null, {}).then(() => {
			return queryInterface.bulkDelete('roles', null, {});
		});
	}
};
