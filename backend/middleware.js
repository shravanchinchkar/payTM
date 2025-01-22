const { JWT_SECRET } = require("./config"); //get the JWT Secret key
const jwt = require("jsonwebtoken"); //get the jwt package

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; //get the token from the user

  //if authHeader is invalid return a error message
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(403).json({
      message: "Invalid input!",
    });
    return;
    
  }

  //if token is valid execute the following code
  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.decode(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    // res.status(403).json({
    //   message: "Something went wrong",
    // });
    res.json({
      message: "Something went wrong",
    });
    return;
  }
}

module.exports = {
  authMiddleware,
};
