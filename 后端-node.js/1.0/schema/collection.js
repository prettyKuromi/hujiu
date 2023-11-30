//导入定义验证规则的模块
const joi = require('joi')

//定义表中元素名称和元素名称的校验规则
const id = joi.number().integer().required()
const name = Joi.string().max(45).required()
const address = Joi.string().max(255).required()
const rank = Joi.number().required()
const opentime = Joi.string().max(100).required()
const sid = Joi.string().valid('0', '1').required().description('0为景点，1为美食')

//校验规则对象-添加收藏
exports.add_collection_schema = {
  body: {
    id,
    name,
    address,
    rank,
    opentime,
    sid,
  },
}

