'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompetitionOrganizers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      competitionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Competitions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
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

    // await queryInterface.addConstraint('CompetitionOrganizers', {
    //   fields: ['CompetitionId', 'OrganizerId'],
    //   type: 'unique',
    //   name: 'unique_competition_organizer'
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompetitionOrganizers');
  }
};
