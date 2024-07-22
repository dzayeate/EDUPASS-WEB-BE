const Joi = require('joi');

module.exports = Joi.object({
    date: Joi.date().required(),
    name: Joi.string().required(),
    category: Joi.string().valid('online', 'offline', 'hybrid').required(),
    time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // HH:mm format
    location: Joi.string().required(),
    description: Joi.string().required(),
    competitionId: Joi.string().uuid().required(),
});
