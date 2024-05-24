let jwt = require('jsonwebtoken');

const generateJwtToken=({email})=>{
    let token=jwt.sign({email},process.env.JWT_SECRET_KEY)
    return token
}

const validateToken=(req,res,next)=>{
    const accessToken=req.body.token
    if(!accessToken){
        return res.status(400).json({error:"user not authenticated"})
    }
    try{
        const validToken=jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
        if(validToken){
            return next()
        }
    }catch(err){
        return res.status(400).json({error:err})
    }
}

module.exports={generateJwtToken,validateToken}