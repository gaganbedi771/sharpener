const jwt = require("jsonwebtoken");
// console.log(process.env.JWT_KEY)
exports.generateWebToken=(id,name)=>{
    return jwt.sign({id:id,name:name},process.env.JWT_KEY);
}
