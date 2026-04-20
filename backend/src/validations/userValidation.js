const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Patient', 'Doctor', 'Lab Specialist', 'Admin').required()
});

module.exports = { registerSchema };
