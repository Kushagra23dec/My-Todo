const todoModel = require("../model/todo");
const userModel = require("../model/user");
const Todo = todoModel.Todo;
const User = userModel.User;
// Reading todos...
exports.getAllTodos = async (req, res) => {
  try {
    const email = req.email;
    const doc = await Todo.find().where({ email: email });
    res.send(doc);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

// Reading Todo by id...
exports.getTodoById = async (req, res) => {
  try {
    const email = req.email;
    let doc = await Todo.findById(req?.params?.id).where({ email: email });

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
    const email = req.email;
    let todo = new Todo(req.body);
    todo.email = email;
    const doc = await todo.save();
    const id = doc._id;
    // adding todo's objectId to user
    const doc2 = await User.findOneAndUpdate(
      { email: email },
      { $push: { todoList: id } }
    );

    res.send(doc);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Updating todo...
exports.updateTodo = async (req, res) => {
  const id = req?.params?.id;
  const email = req.email;
  try {
    let doc = await Todo.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).where({ email: email });
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
    const email = req.email;
    const id = req.params.id;
    let doc = await Todo.findOneAndDelete({ _id: id }).where({ email: email });
    console.log(doc);
    const doc2 = await User.findOneAndUpdate(
      { email: email },
      { $pull: { todoList: doc._id } }
    );

    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
