const model = require("../model/todo");

const Todo = model.Todo;

// Reading todos...
exports.getAllTodos = async (req, res) => {
  const doc = await Todo.find();

  res.send(doc);
};

// Reading Todo by id...
exports.getTodoById = async (req, res) => {};

// creating todo...
exports.createTodo = async (req, res) => {
  try {
    let todo = new Todo(req.body);

    const doc = await todo.save();

    res.send(doc);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Updating todo...
exports.updateTodo = async (req, res) => {};

// deleting todo....
exports.deleteTodo = async (req, res) => {};
