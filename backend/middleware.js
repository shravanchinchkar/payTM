const { JWT_SECRET } = require("./config"); //get the JWT Secret key
const jwt = require("jsonwebtoken"); //get the jwt package

function authMiddleware(req, res, next) {
  console.log("in middleware!")
  const authHeader = req.headers.authorization; //get the token from the user

  // console.log("authHeaders:",authHeader)

  //if authHeader is invalid return a error message
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(403).json({
      message: "Invalid input!",
    });
    return;
    
  }

  //if token is valid execute the following code
  const token = authHeader.split(' ')[1];
  // console.log("Middleware token:",token)

  try {
    const decode = jwt.decode(token, JWT_SECRET);
    console.log("decode:",decode.userId)

    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    res.json({
      message: "Something went wrong",
    });
    return;
  }
}

module.exports = {
  authMiddleware,
};
