const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  todoList: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

exports.User = mongoose.model("User", userSchema);

