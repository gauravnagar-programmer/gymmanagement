import Joi from "joi";


  
  const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(50).required(),
    secretKey: Joi.string().required().messages({
            'any.required': 'You must provide the Admin Registration Secret',
            'string.empty': 'Secret key cannot be empty'
        })
    
  });
  

export default loginSchema;



