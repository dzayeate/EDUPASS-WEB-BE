'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { Competition, Organizer, CompetitionBenefit, CompetitionMentor, CompetitionOrganizer } = require('../models');

    // const benefits = [
    //   {
    //     id: uuidv4(),
    //     description: 'Hadiah Uang Tunai',
    //   },
    //   {
    //     id: uuidv4(),
    //     description: 'Sertifikat',
    //   },
    // ]

    const competition = [
      {
        id: uuidv4(),
        name: 'Hackathon',
        description: 'Hackathon adalah kompetisi pemrograman yang biasanya berlangsung selama beberapa hari. Peserta akan diberikan tantangan untuk membuat aplikasi berdasarkan tema yang diberikan.',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 2)), // contoh: 2 hari dari startDate
        category: 'Web',
        startTime: '08:00:00',
        endTime: '18:00:00', // contoh: 10 jam dari startTime
        location: 'Online',
        platform: 'Zoom',
        banner: null,
        thumbnail: null
      },
      {
        id: uuidv4(),
        name: 'Webinar',
        description: 'Webinar adalah seminar yang diselenggarakan secara online. Peserta dapat mengikuti webinar melalui platform yang disediakan oleh penyelenggara.',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)), // contoh: 1 hari dari startDate
        category: 'Discuss',
        startTime: '08:00:00',
        endTime: '12:00:00', // contoh: 4 jam dari startTime
        location: 'Online',
        platform: 'Zoom',
        banner: null,
        thumbnail: null
      },
    ]

    // const mentors = [
    //   {
    //     id: uuidv4(),
    //     name: 'John Doe',
    //     expertise: 'Web Development',
    //   },
    //   {
    //     id: uuidv4(),
    //     name: 'Jane Doe',
    //     expertise: 'Mobile Development',
    //   },
    // ]

    // const organizers = [
    //   {
    //     id: uuidv4(),
    //     userId: uuidv4(),
    //     contactInfo: 'www.gdsc.com'
    //   },
    //   {
    //     id: uuidv4(),
    //     userId: uuidv4(),
    //     contactInfo: 'www.hmtif.com'
    //   }
    // ]

    // const competitionOrganizers = [
    //   {
    //     CompetitionId: competition[0].id,
    //     OrganizerId: organizers[0].id,
    //   },
    //   {
    //     CompetitionId: competition[1].id,
    //     OrganizerId: organizers[1].id,
    //   },
    // ]

    await Competition.bulkCreate(competition);
    // await Organizer.bulkCreate(organizers);
    // await CompetitionMentor.bulkCreate(competitionMentors);
    // await CompetitionOrganizer.bulkCreate(competitionOrganizers);
  },

  async down (queryInterface, Sequelize) {

  }
};
