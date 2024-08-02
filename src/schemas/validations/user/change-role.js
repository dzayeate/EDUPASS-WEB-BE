const Joi = require("joi");

module.exports = Joi.object({
    roleName: Joi.string().required()
})