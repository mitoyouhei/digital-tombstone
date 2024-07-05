const { decodeUserToken } = require("../util");

const authenticate = (req, res, next) => {
  const token =
    req.session.token || req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = decodeUserToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
