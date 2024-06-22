'use strict';

const ROLE = require('../schemas/enums/role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Roles', 'id');

    // await queryInterface.addColumn('Roles', 'id', {
    //   type: Sequelize.DataTypes.UUID,
    //   defaultValue: Sequelize.literal('UUID()'),
    //   allowNull: false,
    //   primaryKey: true,
    // });

    const now = new Date();
    const roles = [
      { id: Sequelize.literal('UUID()'), name: ROLE.Siswa, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Mahasiswa, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.EO, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Sponsor, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Perusahaan, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Umum, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Juri, createdAt: now, updatedAt: now },
      { id: Sequelize.literal('UUID()'), name: ROLE.Admin, createdAt: now, updatedAt: now },
    ];

    return queryInterface.bulkInsert('Roles', roles);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('Users', 'FK_Users_Roles');
    // await queryInterface.removeColumn('Roles', 'id');

    // await queryInterface.addColumn('Roles', 'id', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   primaryKey: true,
    // });

    return queryInterface.bulkDelete('Roles', null, {});
  }
};
