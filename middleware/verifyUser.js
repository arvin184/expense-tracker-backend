const jwt=require("jsonwebtoken");
const JWT_SECRET = "a@184*184!";


const verifyUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
    {
        return res.status(401).json({success:false,status:"Please provide a jwt token"});

    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.body.userId=data.user.id;
        next();
    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({success:false,status:"Internal server error || JWT error"});
    }

};

module.exports=verifyUser;