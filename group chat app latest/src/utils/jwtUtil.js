const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/serverConfig");

exports.generateToken=(payload)=>{

    try {
    const token=jwt.sign(payload,JWT_SECRET);
    return token;
    } catch (error) {
        console.log("error in genertating jwt token");
        throw error
    }
}