const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
  roleName: Joi.string().allow('').default('Umum'),
  firstName: Joi.string().optional().allow(''),
  lastName: Joi.string().optional().allow(''),
  birthDate:Joi.date().iso().allow(''),
  gender: Joi.string().optional().allow(''),
  phone: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow(''),
  province: Joi.string().optional().allow(''),
  regencies: Joi.string().optional().allow(''),
  image: Joi.string().optional().allow(''),
  institutionName: Joi.string().optional().allow(''),
  field: Joi.string().optional().allow(''),
  pupils: Joi.string().optional().allow(''),
  proof: Joi.string().optional().allow(''),
});
