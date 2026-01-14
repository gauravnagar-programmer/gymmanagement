
 const validate = (schema) => (req,res,next) =>{

  try {
    const {error,value} = schema.validate(req.body,{
      abortEarly : false,
      stripUnknown : true,
    });
    if(error){
      return res.status(400).json({message:"Validation failed",error:error.details[0].message});
    }
    req.body = value;
    next();
    
  } catch (error) {
          return res.status(500).json({message : "internal server error"})

  }
}
 
export default validate