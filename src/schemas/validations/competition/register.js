const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  date : Joi.date().required(),
  category : Joi.string().required(),
  time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  location : Joi.string().required(),
  platform : Joi.string().required(),
  banner : Joi.string().optional().allow(''),
  sponsors: Joi.array().items(Joi.string().email()).optional(),
  mentors: Joi.array().items(Joi.string().email()).optional(),
})