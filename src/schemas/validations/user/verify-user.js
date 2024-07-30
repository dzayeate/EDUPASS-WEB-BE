const Joi = require("joi");

module.exports = Joi.object({
    userId: Joi.string().required(),
    isApproved: Joi.boolean().required()
})