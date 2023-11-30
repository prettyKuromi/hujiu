const Joi = require('joi')
const name = Joi.string().max(255).required()
const address = Joi.string().max(255).required()
const opening_hours = Joi.string().max(125).required()
const picture = Joi.string().required()
const sid = Joi.string().valid('0', '1').required().description('0为景点，1为美食')


exports.release_schema = {
    body: {
      name,
      address,
      opening_hours,
      picture,
      sid,
    },
}