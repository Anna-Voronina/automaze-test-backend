const ToDo = require("../models/ToDo.js");

const { HttpError } = require("../helpers/index.js");

const { ctrlWrapper } = require("../decorators/index.js");

const getAllToDos = async (req, res) => {
  const toDos = await ToDo.find({});

  res.json(toDos);
};

const getToDoById = async (req, res) => {
  const { toDoId } = req.params;
  const foundToDo = await ToDo.findById(toDoId);

  if (!foundToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(foundToDo);
};

const addNewToDo = async (req, res) => {
  console.log(req.body);

  const addedToDo = await ToDo.create({ ...req.body });
  res.status(201).json(addedToDo);
};

const updateToDo = async (req, res) => {
  const { toDoId } = req.params;
  const updatedToDo = await ToDo.findByIdAndUpdate(toDoId, req.body, {
    new: true,
  });

  if (!updatedToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedToDo);
};

const updateCompletedStatus = async (req, res) => {
  const { toDoId } = req.params;
  const updatedToDo = await ToDo.findByIdAndUpdate(toDoId, req.body, {
    new: true,
  });

  if (!updatedToDo) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedToDo);
};

const deleteToDo = async (req, res) => {
  const { toDoId } = req.params;
  const deletedToDo = await ToDo.findByIdAndDelete(toDoId);

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
