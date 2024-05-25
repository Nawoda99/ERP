require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
function authPermission(permission) {
  return (req, res, next) => {
    if (!req.user.user.permissions.includes(permission)) {
      res.status(401);
      return res.send(
        "Not allowed to perform this action : User Doesn't have Permissions"
      );
    }
    next();
  };
}

function authUserType(types) {
  return (req, res, next) => {
    //check for user type
    if (!types.includes(req.user.user.type)) {
      res.status(401);
      return res.send(
        "Not allowed to perform this action :  User is not the right type"
      );
    }
    next();
  };
}

module.exports = { authenticateToken, authPermission, authUserType };
