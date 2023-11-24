const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { toDoId } = req.params;
  if (!isValidObjectId(toDoId)) {
    return next(HttpError(404, `${toDoId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
