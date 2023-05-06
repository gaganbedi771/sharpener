const jwt = require("jsonwebtoken");
// console.log(process.env.JWT_KEY)
exports.generateWebToken=(id,name,groupId=1)=>{
    return jwt.sign({id:id,name:name,groupId:groupId},process.env.JWT_KEY);
}
