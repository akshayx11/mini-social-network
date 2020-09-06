const Joi = require("joi");

exports.userSignupValidate = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    dpURL: Joi.string(),
    mobileno: Joi.string(),
    dob: Joi.number().required()
});
