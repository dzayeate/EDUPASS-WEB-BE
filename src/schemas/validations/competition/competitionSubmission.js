const Joi = require("joi");

module.exports = Joi.object({
    registrationId: Joi.string().uuid().required(),
    url: Joi.string().required()
})