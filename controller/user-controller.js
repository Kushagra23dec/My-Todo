const model = require("../model/user");
const jwt = require("jsonwebtoken");

const User = model.User;

exports.signup = async (req, res) => {
  try {
    let user = User(req.body);

    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    const doc = await user.save();

    console.log(token);

    res.send(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let doc = await User.find({ email: email, password: password });

    if (doc?.length) {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      doc.token = token;
      console.log(token);

      console.log(doc);
      res.send(doc);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
