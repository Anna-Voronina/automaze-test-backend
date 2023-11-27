const ToDo = require("../models/ToDo.js");

const { HttpError } = require("../helpers/index.js");

const { ctrlWrapper } = require("../decorators/index.js");

const getAllToDos = async (req, res) => {
  const { completed, sortOrder, searchQuery } = req.query;
  const { userId } = req.user;

  const query = { userId };

  if (completed) {
    query.completed = completed;
  }

  if (searchQuery) {
    query.description = { $regex: searchQuery, $options: "i" };
  }

  const sortOptions = sortOrder
    ? sortOrder === "desc"
      ? { priority: -1 }
      : { priority: 1 }
    : {};

  const toDos = await ToDo.find(query).sort(sortOptions);

  res.json(toDos);
};

const getToDoById = async (req, res) => {
  const { toDoId } = req.params;
  const { userId } = req.user;
  const foundToDo = await ToDo.findOne({ _id: toDoId, userId });

  if (!foundToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(foundToDo);
};

const addNewToDo = async (req, res) => {
  const { userId } = req.user;

  const addedToDo = await ToDo.create({ ...req.body, userId });
  res.status(201).json(addedToDo);
};

const updateToDo = async (req, res) => {
  const { toDoId } = req.params;
  const { userId } = req.user;

  const updatedToDo = await ToDo.findOneAndUpdate(
    { _id: toDoId, userId },
    req.body,
    { new: true }
  );

  if (!updatedToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedToDo);
};

const updateCompletedStatus = async (req, res) => {
  const { toDoId } = req.params;
  const { userId } = req.user;
  const updatedToDo = await ToDo.findOneAndUpdate(
    { _id: toDoId, userId },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedToDo);
};

const deleteToDo = async (req, res) => {
  const { toDoId } = req.params;
  const { userId } = req.user;
  const deletedToDo = await ToDo.findOneAndDelete({ _id: toDoId, userId });

  if (!deletedToDo) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "ToDo was successfully deleted",
  });
};

module.exports = {
  getAllToDos: ctrlWrapper(getAllToDos),
  getToDoById: ctrlWrapper(getToDoById),
  addNewToDo: ctrlWrapper(addNewToDo),
  updateToDo: ctrlWrapper(updateToDo),
  updateCompletedStatus: ctrlWrapper(updateCompletedStatus),
  deleteToDo: ctrlWrapper(deleteToDo),
};
