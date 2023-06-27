const model = require("../model/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = model.User;
const fs = require("fs");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "..", "private.key"),
  "utf-8"
);

// signup
exports.signup = async (req, res) => {
  try {
    let user = User(req.body);

    // access Token
    const accessToken = jwt.sign(
      { username: req.body.username, email: req.body.email },
      privateKey,

      {
        algorithm: "RS256",
        expiresIn: 30 * 60,
      }
    );

    // refresh Token
    const refreshToken = jwt.sign(
      { username: req.body.username, email: req.body.email },
      privateKey,

      {
        algorithm: "RS256",
        expiresIn: 60 * 60,
      }
    );

    user.refreshToken = refreshToken;
    const doc = await user.save();

    console.log(doc);

    res.json({
      username: req.body.username,
      email: req.body.email,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// login
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // access Token
    const accessToken = jwt.sign(
      { username: req.body.username, email: req.body.email },
      privateKey,

      {
        algorithm: "RS256",
        expiresIn: 30 * 60,
      }
    );

    // refresh Token
    const refreshToken = jwt.sign(
      { username: req.body.username, email: req.body.email },
      privateKey,

      {
        algorithm: "RS256",
        expiresIn: 60 * 60,
      }
    );

    let doc = await User.find({ email: email, password: password });

    if (doc?.length) {
      const id = doc._id;
      let userExist = await User.findOneAndUpdate(
        { _id: id },
        { refreshToken: refreshToken }
      );

      console.log(userExist);
      res.json({
        username: doc?.username,
        email: req.body.email,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
