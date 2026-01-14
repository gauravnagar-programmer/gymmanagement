const memberValidate = (schema) => (req,res,next) =>{

  try {
    const {error,value} = schema.validate(req.body)
  
    if(error) return res.status(400).json(
      {message : "validation fail" , error:error.details[0].message}
    )
  
    req.body = value
    next()
    
  } catch (error) {
      return res.status(500).json({message : "internal server error"})
  }
}

export default memberValidate