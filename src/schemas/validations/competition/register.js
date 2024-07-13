const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  date : Joi.date().required(),
  time : Joi.string().required(),
  location : Joi.string().required(),
  platform : Joi.string().required(),
  banner : Joi.string().optional().allow(''),
  sponsors: Joi.array().items(Joi.string().email()).optional(),
  mentors: Joi.array().items(Joi.string().email()).optional(),

})