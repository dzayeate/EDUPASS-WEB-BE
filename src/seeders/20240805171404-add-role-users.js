'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const ROLE = require('../schemas/enums/role'); // Sesuaikan dengan path file ROLE Anda

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const hashedPassword = await bcrypt.hash('password', 10);

      const roles = [
        ROLE.Siswa,
        ROLE.Mahasiswa,
        ROLE.EO,
        ROLE.Sponsor,
        ROLE.Perusahaan,
        ROLE.Juri,
        ROLE.Admin,
      ];

      const biodates = await queryInterface.sequelize.query(
        'SELECT id, firstName FROM Biodates WHERE firstName IN ("Admin", "Siswa", "Mahasiswa", "EO", "Sponsor", "Perusahaan", "Juri")',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (biodates.length < 14) {
        throw new Error('Not enough biodates found.');
      }

      const roleIds = {};
      for (const role of roles) {
        roleIds[role] = await queryInterface.rawSelect('Roles', {
          where: { name: role },
        }, ['id']);
      }

      const users = [];
      const emailCounter = {};

      for (const biodate of biodates) {
        const role = roles.find(r => r.toLowerCase() === biodate.firstName.toLowerCase());
        if (role) {
          const baseEmail = biodate.firstName.toLowerCase();
          emailCounter[baseEmail] = (emailCounter[baseEmail] || 0) + 1;
          const email = `${baseEmail}${emailCounter[baseEmail]}@example.com`;

          users.push({
            id: uuidv4(),
            email: email,
            isVerified: true,
            password: hashedPassword,
            roleId: roleIds[role],
            biodateId: biodate.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      if (users.length < 14) {
        throw new Error('Not enough users created.');
      }

      await queryInterface.bulkInsert('Users', users, {});
    } catch (error) {
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'siswa1@example.com', 'siswa2@example.com',
          'mahasiswa1@example.com', 'mahasiswa2@example.com',
          'eo1@example.com', 'eo2@example.com',
          'sponsor1@example.com', 'sponsor2@example.com',
          'perusahaan1@example.com', 'perusahaan2@example.com',
          'juri1@example.com', 'juri2@example.com',
          'admin1@example.com', 'admin2@example.com',
        ],
      },
    });
  }
};
