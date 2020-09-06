const Joi = require("joi");

exports.postValidator = Joi.object({
    post: Joi.string().required(),
    privacy: Joi.string().valid("PUBLIC", "PRIVATE", "FRIENDS").required()
});