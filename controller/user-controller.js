const model = require("../model/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = model.User;
const fs = require("fs");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signup = async (req, res) => {
  try {
    let user = User(req.body);

    const token = jwt.sign(
      { email: req.body.email },
      privateKey,

      {
        algorithm: "RS256",
        expiresIn: 60 * 60,
      }
    );

    user.token = token;
    const doc = await user.save();

    console.log(token);

    res.json({ email: req.body.email, access_token: token });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    let doc = await User.find({ email: email, password: password });

    if (doc?.length) {
      const token = jwt.sign(
        { email: req.body.email },
        privateKey,

        {
          algorithm: "RS256",
          expiresIn: 60 * 60,
        }
      );

      doc.token = token;
      console.log(token);

      console.log(doc);
      res.json({ email: req.body.email, access_token: token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.statu(401).send(err);
  }
};
