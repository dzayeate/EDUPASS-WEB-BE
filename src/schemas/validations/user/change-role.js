const Joi = require("joi");

module.exports = Joi.object({
    userId: Joi.string().required(),
    roleName: Joi.string().required()
})