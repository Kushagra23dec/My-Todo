require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
const cors = require("cors");
const auth = require("./auth");

const authorization = auth.authorization;
// creating database connection....

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo");
  console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express();
app.use(cors());
const router = express.Router();
// middlewares
app.use(express.json());

app.use("/auth", userRouter.router);
app.use("/", authorization, todoRouter.router);

app.listen(8080, () => {
  console.log("server started");
});
