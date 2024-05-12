const teacherSchema = require("./../Model/teacherModel");
const childSchema = require("./../Model/childModel");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  if (
    req.body.email == "zeinabsabry340@gmail.com" &&
    req.body.password == "123"
  ) {
    let token = jwt.sign({ _id: 1, role: "admin" }, "nurseryApp", {
      expiresIn: "1h",
    });
    res.status(200).json({ data: "success", token });
  } else {
    teacherSchema
      .findOne({
        email: req.body.email,
        password: req.body.password,
      })
      .then((teacher) => {
        if (!teacher) {
          childSchema
            .findOne({
              email: req.body.email,
              password: req.body.password,
            })
            .then((child) => {
              if (!child) {
                res.status(401).json({ message: "Not Authenticated" });
              } else {
                let token = jwt.sign(
                  { _id: child._id, role: "child" },
                  "nurseryApp",
                  {
                    expiresIn: "1h",
                  }
                );
              }
            })
            .catch((error) => next(error));
        } else {
          let token = jwt.sign(
            { _id: teacher._id, role: "teacher" },
            "nurseryApp",
            {
              expiresIn: "1h",
            }
          );
        }
      })
      .catch((error) => next(error));
  }
};
