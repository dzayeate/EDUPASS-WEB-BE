'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Biodates', [
      {
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'One',
        birthDate: new Date(1980, 1, 1),
        gender: 'Male',
        phone: '1234567890',
        address: '123 Admin St',
        province: 'Province 1',
        regencies: 'Regency 1',
        institutionName: 'Institution 1',
        field: 'Field 1',
        pupils: 'Pupils 1',
        image: '',
        proof: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'Two',
        birthDate: new Date(1985, 2, 2),
        gender: 'Female',
        phone: '0987654321',
        address: '456 Admin St',
        province: 'Province 2',
        regencies: 'Regency 2',
        institutionName: 'Institution 2',
        field: 'Field 2',
        pupils: 'Pupils 2',
        image: '',
        proof: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'Three',
        birthDate: new Date(1990, 3, 3),
        gender: 'Male',
        phone: '1122334455',
        address: '789 Admin St',
        province: 'Province 3',
        regencies: 'Regency 3',
        institutionName: 'Institution 3',
        field: 'Field 3',
        pupils: 'Pupils 3',
        image: '',
        proof: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Biodates', {
      firstName: {
        [Sequelize.Op.in]: ['Admin'],
      },
    });
  }
};
