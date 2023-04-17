require('dotenv').config();
const jwt = require("jsonwebtoken");
exports.generateAccessToken=(id, name, premium)=> {
    return jwt.sign({ id: id, name: name, premium: premium }, process.env.SECRET_KEY);
}