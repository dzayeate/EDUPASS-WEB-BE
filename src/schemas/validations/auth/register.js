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
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  province: Joi.string().required(),
  regencies: Joi.string().required(),
  image: Joi.string(),
  institutionName: Joi.string(),
  field: Joi.string(),
  pupils: Joi.string(),
  proof: Joi.string(),
})
