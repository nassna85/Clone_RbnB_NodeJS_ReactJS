const jwt = require("jsonwebtoken");

const generateToken = (payload, callback) => {
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, callback);
};

module.exports = {
  generateToken
};
