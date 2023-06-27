require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
const cors = require("cors");
const auth = require("./auth");
const path = require("path");

const authorization = auth.authorization;

// db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("database connected");
}

const app = express();
app.use(cors());
const router = express.Router();
// middlewares
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "dist")));

app.use("/oauth", userRouter.router);
app.use("/todo", authorization, todoRouter.router);
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
