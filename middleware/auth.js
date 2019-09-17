const webToken = require("jsonwebtoken");
const config = require("config");

module.exports = function(request, response, next) {
  // Get token from header
  const token = request.header("x-auth-token");

  // Check if no token
  if (!token) {
    return response
      .status(401)
      .json({ msg: "User not authorized, please sign in" });
  }

  // Verify Token

  try {
    const decoded = webToken.verify(token, config.get("webTokenKey"));

    request.user = decoded.user;
    next();
  } catch (error) {
    response.status(401).json({ msg: "Token is not valid" });
  }
};
