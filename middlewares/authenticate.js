const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    next(HttpError(401));
  }

  req.user = { userId };
  next();
};

module.exports = authenticate;
