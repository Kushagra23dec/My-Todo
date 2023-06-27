const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  is_pinned: { type: Boolean, require: true },
  email: { type: String, require: true },
});

exports.Todo = mongoose.model("Todo", todoSchema);
