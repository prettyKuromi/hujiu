//导入定义验证规则的模块
const joi = require('joi')



//定义表中元素名称和元素名称的校验规则
const id = Joi.number().integer().required()
const userid = Joi.string().max(45).required()
const account = Joi.string().max(45).required()
const content = Joi.string().max(555).required()
const picture = Joi.binary().allow(null)
const sid = Joi.string().valid('0', '1').required().description('0为景点，1为美食')
const rating = joi.string().required()
const up = joi.string().required()
const down = joi.string().required()