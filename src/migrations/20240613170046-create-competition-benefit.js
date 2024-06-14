'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompetitionBenefits', {
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
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      BenefitId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Benefits',
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

    await queryInterface.addConstraint('CompetitionBenefits', {
      fields: ['CompetitionId', 'BenefitId'],
      type: 'unique',
      name: 'unique_competition_benefit'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompetitionBenefits');
  }
};
