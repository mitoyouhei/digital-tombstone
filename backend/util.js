const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const decodeUserToken = (token) => {
  return token ? jwt.verify(token, process.env.JWT_SECRET) : null;
};

const encodeUserToken = (user) => {
  return user
    ? jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)
    : null;
};

module.exports = {
  decodeUserToken,
  encodeUserToken,
};
