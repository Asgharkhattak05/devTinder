const adminAuth = (req, res, next) => {
  const token = "1234";
  const isauthorized = token === "1234";
  if (isauthorized) {
    next();
  } else {
    res.send("user is not authorized");
  }
};
const userAuth = (req, res, next) => {
  const token = "12346";
  const isauthorized = token === "1234";
  if (isauthorized) {
    next();
  } else {
    res.send("user is not authorized");
  }
};

module.exports = { adminAuth, userAuth };
