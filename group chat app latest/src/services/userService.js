const userRepository = require("../repository/userRepository");
const {passwordUtil,jwtUtil} = require("../utils/index");

exports.signup = async (data) => {
  try {
    const existingUser = await userRepository.findByEmailorPhone(
      data.email,
      data.phone
    );

    if (existingUser) {
      throw new Error("User Already Exists");
    }
    const hashedPassword = await passwordUtil.hashPassword(data.password);
    data.password = hashedPassword;
    const user = await userRepository.addUser(data);
    return user;
  } catch (error) {
    console.log("error in user service", error.message);
    throw error;
  }
};

exports.signin = async (data) => {
  try {
    const user = await userRepository.findByEmailorPhone(
      data.emailOrPhone,
      data.emailOrPhone
    );

    if (!user) {
      throw new Error("User with these credentials doesnot exists");
    }
    const matchPassword = await passwordUtil.matchPassword(data.password,user.password);
    if(!matchPassword){
      throw new Error("Wrong Password");
    };

    const token= jwtUtil.generateToken({id:user.id,name:user.name});
    
    return ({Authorization:token, userId:user.id});
  } catch (error) {
    console.log("error in user service", error.message);
    throw error;
  }
};
