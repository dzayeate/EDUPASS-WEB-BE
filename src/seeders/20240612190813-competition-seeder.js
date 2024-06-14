'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { Benefit, Competition, Mentor, Organizer, CompetitionBenefit, CompetitionMentor, CompetitionOrganizer } = require('../models');

    const benefits = [
      {
        id: uuidv4(),
        description: 'Hadiah Uang Tunai',
      },
      {
        id: uuidv4(),
        description: 'Sertifikat',
      },
    ]

    const competition = [
      {
        id: uuidv4(),
        name: 'Hackathon',
        description: 'Hackathon adalah kompetisi pemrograman yang biasanya berlangsung selama beberapa hari. Peserta akan diberikan tantangan untuk membuat aplikasi berdasarkan tema yang diberikan.',
        date: new Date(),
        time: '08:00:00',
        location: 'Online',
        platform: 'Zoom',
      },
      {
        id: uuidv4(),
        name: 'Webinar',
        description: 'Webinar adalah seminar yang diselenggarakan secara online. Peserta dapat mengikuti webinar melalui platform yang disediakan oleh penyelenggara.',
        date: new Date(),
        time: '08:00:00',
        location: 'Online',
        platform: 'Zoom',
      },
    ]

    const mentors = [
      {
        id: uuidv4(),
        name: 'John Doe',
        expertise: 'Web Development',
      },
      {
        id: uuidv4(),
        name: 'Jane Doe',
        expertise: 'Mobile Development',
      },
    ]

    const organizers = [
      {
        id: uuidv4(),
        name: 'GDSC',
        contactInfo: 'www.gdsc.com'
      },
      {
        id: uuidv4(),
        name: 'HMTIF',
        contactInfo: 'www.hmtif.com'
      }
    ]

    const competitionBenefits = [
      {
        CompetitionId: competition[0].id,
        BenefitId: benefits[0].id,
      },
      {
        CompetitionId: competition[1].id,
        BenefitId: benefits[1].id,
      },
    ]

    const competitionMentors = [
      {
        CompetitionId: competition[0].id,
        MentorId: mentors[0].id,
      },
      {
        CompetitionId: competition[1].id,
        MentorId: mentors[1].id,
      },
    ]

    const competitionOrganizers = [
      {
        CompetitionId: competition[0].id,
        OrganizerId: organizers[0].id,
      },
      {
        CompetitionId: competition[1].id,
        OrganizerId: organizers[1].id,
      },
    ]

    await Benefit.bulkCreate(benefits);
    await Competition.bulkCreate(competition);
    await Mentor.bulkCreate(mentors);
    await Organizer.bulkCreate(organizers);
    await CompetitionBenefit.bulkCreate(competitionBenefits);
    await CompetitionMentor.bulkCreate(competitionMentors);
    await CompetitionOrganizer.bulkCreate(competitionOrganizers);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
