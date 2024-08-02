'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', 10);

    const role = await queryInterface.rawSelect('Roles', {
      where: {
        name: 'Admin',
      },
    }, ['id']);

    if (!role) {
      throw new Error('Role "admin" not found.');
    }

    const biodates = await queryInterface.sequelize.query(
      'SELECT id FROM Biodates WHERE firstName = "Admin"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (biodates.length < 3) {
      throw new Error('Not enough biodates found.');
    }

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        email: 'admin1@example.com',
        isVerified: true,
        password: hashedPassword,
        roleId: role,
        biodateId: biodates[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'admin2@example.com',
        password: hashedPassword,
        isVerified: true,
        roleId: role,
        biodateId: biodates[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'admin3@example.com',
        password: hashedPassword,
        isVerified: true,
        roleId: role,
        biodateId: biodates[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'admin1@example.com',
          'admin2@example.com',
          'admin3@example.com',
        ],
      },
    });
  }
};
