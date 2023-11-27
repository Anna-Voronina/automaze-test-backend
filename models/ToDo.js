const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");

const toDoSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Set description for your todo"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      required: [true, "Set priority for your todo"],
    },
    userId: {
      type: String,
      required: [true, "Set userId for your todo"],
    },
  },
  { versionKey: false, timestamps: true }
);

toDoSchema.post("save", handleValidateError);

toDoSchema.pre("findOneAndUpdate", runUpdateValidators);

toDoSchema.post("findOneAndUpdate", handleValidateError);

const ToDo = model("todo", toDoSchema);

module.exports = ToDo;
