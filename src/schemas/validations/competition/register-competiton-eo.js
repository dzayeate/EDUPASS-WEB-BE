const Joi = require('joi');

const schema = Joi.object({
  competitionId: Joi.string().guid({ version: 'uuidv4' }).required(),
  domicile: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  isTeam: Joi.boolean().required(),
  teamSize: Joi.number().integer().min(1).optional().allow(null, ''),
  teamMembers: Joi.array().items(
    Joi.object({
      userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    })
  ).optional().allow(null, ''),
}).when(Joi.object({ isTeam: true }).unknown(), {
  then: Joi.object({
    teamSize: Joi.number().integer().min(1).required(),
    teamMembers: Joi.array().min(1).required(),
  })
}).when(Joi.object({ isTeam: false }).unknown(), {
  then: Joi.object({
    teamSize: Joi.optional().allow(null, ''),
    teamMembers: Joi.optional().allow(null, ''),
  })
});

module.exports = schema;
