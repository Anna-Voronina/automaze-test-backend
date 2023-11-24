const express = require("express");

const ctrl = require("../../controllers/todos");

const { validateBody } = require("../../decorators");

const { isValidId } = require("../../middlewares");

const schemas = require("../../schemas/todos");

const addToDoValidate = validateBody(schemas.toDoAddSchema);

const updateCompletedFieldValidate = validateBody(
  schemas.toDoUpdateCompletedSchema
);

const router = express.Router();

router.get("/", ctrl.getAllToDos);

router.get("/:toDoId", isValidId, ctrl.getToDoById);

router.post("/", addToDoValidate, ctrl.addNewToDo);

router.put("/:toDoId", isValidId, addToDoValidate, ctrl.updateToDo);

router.patch(
  "/:toDoId/completed",
  isValidId,
  updateCompletedFieldValidate,
  ctrl.updateCompletedStatus
);

router.delete("/:toDoId", isValidId, ctrl.deleteToDo);

module.exports = router;
