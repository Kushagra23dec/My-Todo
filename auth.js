const jwt = require("jsonwebtoken");

exports.authorization = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];

    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
};
