const express = require("express");
const todoController = require("../controller/todo-controller");

const router = express.Router();

router
  .get("/", todoController.getAllTodos)
  .get("/:id", todoController.getTodoById)
  .post("/", todoController.createTodo)
  .patch("/:id", todoController.updateTodo)
  .delete("/:id", todoController.deleteTodo);

exports.router = router;
