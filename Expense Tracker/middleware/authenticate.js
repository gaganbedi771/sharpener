const jwt=require("jsonwebtoken");
const User=require("../models/users");


const authenticate=(req,res,next)=>{
    try{
        const token=req.header("Authorization");
        const user=jwt.verify(token,"secretkey");
        
        User.findByPk(user.userId)
        .then(result=>{
            req.user=user;
            next();
        })

    }
    catch(err){

        console.log(err);
        res.status(500).json(err)
    }
}


module.exports=authenticate;