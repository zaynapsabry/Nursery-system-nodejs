const childSchema = require("./../Model/childModel");

exports.getAllChilds = (request, response, next) => {
  childSchema
    .find({})
    .then((data) => {
      response
        .status(200)
        .json({ message: "Childs fetched successfully", data });
    })
    .catch((error) => next(error));
};

exports.getChild = (request, response, next) => {
  childSchema
    .findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Child doesn't Exist!");

      response
        .status(200)
        .json({ message: "Child fetched successfully", object });
    })
    .catch((error) => next(error));
};

exports.addChild = (request, response, next) => {
  let object = new childSchema(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json({ message: "Child added successfully", data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (request, response, next) => {
  const id = request.params.id;
  const newData = request.body;

  teacherSchema
    .findByIdAndUpdate(id, newData, { new: true })
    .then((data) => {
      if (!data) throw new Error("Child doesn't Exist!");
      response.status(200).json({
        message: "Child updated successfully",
        data,
      });
    })
    .catch((error) => next(error));
};

exports.deleteChild = (request, response, next) => {
  childSchema
    .deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Child doesn't Exist!");

      response
        .status(200)
        .json({ message: "Child deleted successfully", object });
    })
    .catch((error) => next(error));
};
