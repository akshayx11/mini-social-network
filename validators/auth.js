const Joi = require("joi");

exports.loginValidate = Joi.object({
   email: Joi.string().required(),
   password: Joi.string().required()
});

exports.jwtValidator = Joi.object({
   email: Joi.string().required(),
   userId: Joi.number().required()
});