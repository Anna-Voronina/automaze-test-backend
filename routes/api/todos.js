const express = require("express");

const ctrl = require("../../controllers/todos");

const { validateBody } = require("../../decorators");

const { authenticate, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/todos");

const addToDoValidate = validateBody(schemas.toDoAddSchema);

const updateCompletedFieldValidate = validateBody(
  schemas.toDoUpdateCompletedSchema
);

const router = express.Router();

router.get("/", authenticate, ctrl.getAllToDos);

router.get("/:toDoId", authenticate, isValidId, ctrl.getToDoById);

router.post("/", authenticate, addToDoValidate, ctrl.addNewToDo);

router.put(
  "/:toDoId",
  authenticate,
  isValidId,
  addToDoValidate,
  ctrl.updateToDo
);

router.patch(
  "/:toDoId/completed",
  authenticate,
  isValidId,
  updateCompletedFieldValidate,
  ctrl.updateCompletedStatus
);

router.delete("/:toDoId", authenticate, isValidId, ctrl.deleteToDo);

router.get("/ping", ctrl.getPing);

module.exports = router;
