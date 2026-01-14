import Joi from "joi"

const memberSchema = Joi.object({
  name : Joi.string().min(3).max(50).required(),
  phone : Joi.string().required(),
  membership : Joi.string().max(1).required(),
  startingdate : Joi.string().required()

})

export default memberSchema