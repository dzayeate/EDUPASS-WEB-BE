const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  category: Joi.string().required(),
  startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  location: Joi.string().required(),
  platform: Joi.string().required(),
  banner: Joi.string().optional().allow(''),
  thumbnail: Joi.string().optional().allow(''),
  sponsors: Joi.array().items(Joi.string().email()).optional(),
  mentors: Joi.array().items(Joi.string().email()).optional()
});
