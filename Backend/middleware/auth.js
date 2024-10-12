import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    const {token} =req.headers;
    // const authHeader = req.headers.authorization;
    if(!token){
        return(res.json({success:false,message:"Not autherize login again"}))
    }
    try {
        const token_decoder = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decoder.id;
        next();
    } catch (error) {
        console.log(error);
        return(res.json({success:false,message:"Error"}))
    }
}

export default authMiddleware