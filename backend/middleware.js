const { JWT_SECRET } = require("./config"); //get the JWT Secret key
const jwt = require("jsonwebtoken"); //get the jwt package

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; //get the token from the user

  //if authHeader is invalid return a error message
  if (!authHeader || !authHeader.startWith("Bearer")) {
    return res.status(403).json({
      message: "Invalid input!",
    });
  }

  //if token is valid execute the following code
  const token = authHeader.split("")[1];

  try {
    const decode = jwt.decode(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  authMiddleware,
};
