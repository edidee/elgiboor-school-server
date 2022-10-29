const { UserInputError } = require("apollo-server-express");
const { validateAdminLogin } = require("../../utils/validators");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Administrator");
const SECRET_KEY = require("../../config");

function generateToken(admin) {
  return jwt.sign(
    {
      username: admin.username,
    },
    SECRET_KEY.toString(),
    { expiresIn: "7d" }
  );
}
module.exports = {
  Mutation: {
    async adminLogin(_, { username, password }) {
      const { errors, valid } = validateAdminLogin(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const admin = await Admin.findOne({ username });
      if (!admin) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      } else if (admin.password !== password) {
        errors.general = "Invalid Username or Password";
        throw new UserInputError("Invalid Username or Password", { errors });
      }
      const token = generateToken(admin);
      return {
        ...admin._doc,
        token,
      };
    },
  },
};
