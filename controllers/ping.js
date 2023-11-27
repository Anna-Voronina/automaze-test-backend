const { ctrlWrapper } = require("../decorators/index.js");

const getPing = async (_, res) => {
  res.status(200).json({ message: "Server is alive" });
};

module.exports = {
  getPing: ctrlWrapper(getPing),
};
