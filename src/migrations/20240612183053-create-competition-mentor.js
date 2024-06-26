'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompetitionMentors', {
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
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
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

    await queryInterface.addConstraint('CompetitionMentors', {
      fields: ['CompetitionId', 'UserId'],
      type: 'unique',
      name: 'unique_competition_mentor'
    });

    await queryInterface.addConstraint('CompetitionMentors', {
      fields: ['CompetitionId'],
      type: 'foreign key',
      name: 'fk_competition_mentor_competition',
      references: {
        table: 'Competitions',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('CompetitionMentors', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_competition_mentor_mentor',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompetitionMentors');
  }
};
