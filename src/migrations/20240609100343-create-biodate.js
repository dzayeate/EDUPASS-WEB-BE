'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Biodates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      institutionName: {
        type: Sequelize.STRING
      },
      institutionLevel: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      regencies: {
        type: Sequelize.STRING
      },
      studyField: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Biodates');
  }
};
