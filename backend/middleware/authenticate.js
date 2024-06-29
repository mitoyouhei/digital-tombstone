const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token =
    req.session.token || req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
