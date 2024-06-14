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
      CompetitionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Competitions',
          key: 'id'
        }
      },
      MentorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Mentors',
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
      fields: ['CompetitionId', 'MentorId'],
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
      fields: ['MentorId'],
      type: 'foreign key',
      name: 'fk_competition_mentor_mentor',
      references: {
        table: 'Mentors',
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
