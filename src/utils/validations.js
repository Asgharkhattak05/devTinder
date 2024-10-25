const validator = require("validator");

const signupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Names are required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name must be between 4 and 50 characters");
  } else if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Last name must be between 4 and 50 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("provide the correct email address");
  } else if(!validator.isStrongPassword(password)){
    throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }
};


module.exports={
    signupValidation
}