const Joi = require('joi')

//定义发表评论的验证表单
const rating = Joi.number().required()
const content = Joi.string().max(2550).required()
const picture1 = Joi.string().max(255)
const picture2 = Joi.string().max(255)
const picture3 = Joi.string().max(255)
const id = Joi.number().integer().min(1).required()
const sid = Joi.string().valid('0', '1').required().description('0为景点,1为美食')


exports.post_content_schema={
    body:{
        rating,
        content,
        picture1,
        picture2,
        picture3,
        id,
        sid,
      },
}