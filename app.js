const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const toDoRouter = require("./routes/api/todos");
const pingRouter = require("./routes/api/ping");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/todos", toDoRouter);
app.use("/api/ping", pingRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
