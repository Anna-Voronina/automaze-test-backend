const Joi = require("joi");

const toDoAddSchema = Joi.object({
  description: Joi.string().required().messages({
    "any.required": "missing required description field",
    "string.base": "description should be a type of string",
  }),
  completed: Joi.boolean().messages({
    "boolean.base": "completed should be a type of boolean",
  }),
  priority: Joi.number().required().integer().min(1).max(10).messages({
    "any.required": "missing required priority field",
    "number.base": "priority must be a number",
    "number.min": "priority must be greater than or equal to 1",
    "number.max": "priority must be less than or equal to 10",
  }),
});

const toDoUpdateCompletedSchema = Joi.object({
  completed: Joi.boolean().required().messages({
    "any.required": "missing required completed field",
    "boolean.base": "completed should be a type of boolean",
  }),
});

module.exports = {
  toDoAddSchema,
  toDoUpdateCompletedSchema,
};
