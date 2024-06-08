const joi = require('joi');

module.exports = joi.object({
  page: joi.number().integer().min(1),
  length: joi.number().integer().min(1),
  search: joi.string(),
});
