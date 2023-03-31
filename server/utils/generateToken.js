const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id) => {
  console.log(jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  }))
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = generateToken;