const model = require("../model/todo");

const Todo = model.Todo;

// Reading todos...
exports.getAllTodos = async (req, res) => {
  const doc = await Todo.find();

  res.send(doc);
};

// Reading Todo by id...
exports.getTodoById = async (req, res) => {
  try {
    let doc = await Todo.findById(req?.params?.id);

    console.log(doc);
    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

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
exports.updateTodo = async (req, res) => {
  const id = req?.params?.id;
  try {
    let doc = await Todo.findOneAndUpdate({ _id: id }, req.body, { new: true });
    console.log(doc);

    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// deleting todo....
exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    let doc = await Todo.findOneAndDelete({ _id: id });
    console.log(doc);
    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
