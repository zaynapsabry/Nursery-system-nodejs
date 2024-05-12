const classSchema = require("./../Model/classModel");

exports.getAllClasses = (request, response, next) => {
  classSchema
    .find({})
    .populate({ path: "children", model: "child", select: { fullName: 1 } })
    .populate({ path: "supervisor", model: "teacher", select: { fullName: 1 } })
    .then((data) => {
      response
        .status(200)
        .json({ message: "Classes fetched successfully", data });
    })
    .catch((error) => next(error));
};

exports.getClass = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Class doesn't Exist!");

      response
        .status(200)
        .json({ message: "Class fetched successfully", object });
    })
    .catch((error) => next(error));
};

exports.addClass = (request, response, next) => {
  let object = new classSchema(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json({ message: "Class added successfully", data });
    })
    .catch((error) => next(error));
};

exports.addClassChild = (request, response, next) => {
  const { _id } = request.body;

  classSchema
    .findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("Class doesn't exist!");
      }

      if (object.children.includes(_id)) {
        throw new Error("Child already exists in the class!");
      }

      object.children.push(_id);
      return object.save();
    })
    .then((updatedObject) => {
      response.status(200).json({
        message: "Child added to class successfully",
        object: updatedObject,
      });
    })
    .catch((error) => next(error));
};

exports.updateClass = (request, response, next) => {
  const id = request.params.id;
  const newData = request.body;

  classSchema
    .findByIdAndUpdate(id, newData, { new: true })
    .then((data) => {
      if (!data) throw new Error("Class doesn't Exist!");
      response.status(200).json({
        message: "Class updated successfully",
        data,
      });
    })
    .catch((error) => next(error));
};

exports.deleteClass = (request, response, next) => {
  classSchema
    .deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Class doesn't Exist!");

      response
        .status(200)
        .json({ message: "Class deleted successfully", object });
    })
    .catch((error) => next(error));
};

exports.getClassChildrenInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "children", model: "child" })
    .then((object) => {
      if (!object) throw new Error("This class doesn't have childs!");

      response
        .status(200)
        .json({ message: "Class childs fetched successfully", object });
    })
    .catch((error) => next(error));
};

exports.getClassTeacherInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "supervisor", model: "teacher" })
    .then((object) => {
      if (!object) throw new Error("This class doesn't have supervisor!");

      response
        .status(200)
        .json({ message: "Class supervisor fetched successfully", object });
    })
    .catch((error) => next(error));
};
