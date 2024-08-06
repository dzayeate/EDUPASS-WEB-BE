'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Competitions', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          startDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
          },
          endDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
          },
          category: {
            type: Sequelize.STRING,
            allowNull: false
          },
          startTime: {
            type: Sequelize.TIME,
            allowNull: false
          },
          endTime: {
            type: Sequelize.TIME,
            allowNull: false
          },
          location: {
            type: Sequelize.STRING,
            allowNull: false
          },
          platform: {
            type: Sequelize.STRING,
            allowNull: false
          },
          banner: {
            type: Sequelize.STRING,
            allowNull: true
          },
          thumbnail: {
            type: Sequelize.STRING,
            allowNull: true
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Competitions');
  }
};
