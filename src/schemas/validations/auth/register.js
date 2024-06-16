const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  roleName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nik : Joi.string().max(16),
  institutionName: Joi.string(),
  institutionLevel: Joi.string(),
  province: Joi.string(),
  regencies: Joi.string(),
  studyField: Joi.string(),
  reason: Joi.string(),
  image: Joi.string(),
})
