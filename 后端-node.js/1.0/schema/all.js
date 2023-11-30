//导入定义验证规则的模块
const joi = require('joi')



//定义表中元素名称和元素名称的校验规则
const id = Joi.number().integer().required()
const name = Joi.string().max(255).required()
const address = Joi.string().max(255).required()
const opentime = Joi.string().max(125).required()
const picture = Joi.string().max(45).required()
const rank = Joi.number().required()
const sid = Joi.string().valid('0', '1').required().description('0为景点,1为美食')