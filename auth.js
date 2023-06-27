const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);

exports.authorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decoded = jwt.verify(token, publicKey);
    req.email = decoded?.email;
    console.log(decoded);
    next();
  } catch (err) {
    // console.log(err);
    res.sendStatus(403);
  }
};
