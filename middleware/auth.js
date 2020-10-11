const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Development Mode
  if (process.env.DEV) {
    req.isAuth = true;
    // req.userId = "5f82fa66e76d8ba6eaa136e6"; // Teacher
    req.userId = "5f6c9d362d6631017c08d9ad"; // Student
    return next();
  }

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  if (!authHeader.startsWith("Bearer")) {
    // Reject if there is no Bearer in the token
    req.isAuth = false;
    return next();
  }
  const accessToken = authHeader.split(" ")[1];

  let decodedAccessToken;

  try {
    decodedAccessToken = jwt.verify(accessToken, "somesupersecretsecret");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedAccessToken || !decodedAccessToken.userId) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedAccessToken.userId;
  req.isAuth = true;
  next();
};
