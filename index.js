const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");

// creating database connection....

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
  console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express();
const router = express.Router();
// middlewares
app.use(express.json());

app.use("/", todoRouter.router);






app.listen(8080, () => {
  console.log("server started");
});
