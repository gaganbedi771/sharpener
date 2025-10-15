const { response, jwtUtil } = require("../utils/index");
const userRepository = require("../repository/userRepository");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { id, name } = jwtUtil.verify(token);
    const user = await userRepository.findByIdAndName(id, name);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    response.sendErrorResponse(res, 500, error, "Authentication error");
  }
};
