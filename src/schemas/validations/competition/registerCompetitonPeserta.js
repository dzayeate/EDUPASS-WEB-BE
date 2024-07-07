const Joi = require('joi')

module.exports = Joi.object({
  competitionId: Joi.string().uuid().required(),
  domicile: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  supportingDocuments: Joi.any().optional(),
  isTeam: Joi.boolean().required(),
  teamSize: Joi.when('isTeam', { is: true, then: Joi.number().integer().min(1).required(), otherwise: Joi.optional() }),
  teamMembers: Joi.when('isTeam', { is: true, then: Joi.array().items(
    Joi.object({
      userId: Joi.string().uuid().required()
    })
  ).required(), otherwise: Joi.optional() })
})