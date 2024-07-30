'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScheduleCompetitions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      date: {
        type: Sequelize.DATEONLY
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.ENUM('online', 'offline', 'hybrid')
      },
      time: {
        type: Sequelize.TIME
      },
      location: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      competitionId: {
        type: Sequelize.UUID,
        references: {
          model: 'Competitions',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('ScheduleCompetitions');
  }
};