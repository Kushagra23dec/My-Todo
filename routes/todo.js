const express = require("express");
const todoController = require("../controller/todo-controller");

const router = express.Router();

router
  .get("/", todoController.getAllTodos)
  .post("/", todoController.createTodo);

exports.router = router;
