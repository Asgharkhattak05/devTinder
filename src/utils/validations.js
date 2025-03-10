const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is required");
  } else if (!email) {
    throw new Error("email address is required");
  } else if (!password) {
    throw new Error("password is required");
  } else if (!validator.isEmail) {
    throw new Error("invalid email address");
  }
};

module.exports = {
  validateSignupData,
};
