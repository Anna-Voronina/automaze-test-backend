const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, id] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  if (!id) {
    next(HttpError(401));
  }

  req.user = { userId: id };
  next();
};

module.exports = authenticate;
