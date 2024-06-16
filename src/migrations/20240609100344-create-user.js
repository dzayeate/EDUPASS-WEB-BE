'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      biodateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Biodates',
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
      },
    });

    // Add a foreign key constraint to the roleId column
    await queryInterface.addConstraint('Users', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'FK_Users_Roles',
      references: {
        table: 'Roles',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    // Add a foreign key constraint to the biodateId column
    await queryInterface.addConstraint('Users', {
      fields: ['biodateId'],
      type: 'foreign key',
      name: 'FK_Users_Biodates',
      references: {
        table: 'Biodates',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', 'FK_Users_Biodates');
    await queryInterface.removeConstraint('Users', 'FK_Users_Roles');
    await queryInterface.dropTable('Users');
  }
};
