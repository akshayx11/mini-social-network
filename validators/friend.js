const Joi = require("joi");


exports.friendResponseValidator = Joi.object({
    friendId: Joi.string().required(),
    response: Joi.string().valid("ACCEPTED","REJECTED", "REMOVED").required()
 });