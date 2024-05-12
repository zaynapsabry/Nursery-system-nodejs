const teacherSchema = require("./../Model/teacherModel");
const classSchema = require("./../Model/classModel");

exports.getAllTeachers = (request, response, next) => {
  teacherSchema
    .find({})
    .then((data) => {
      response
        .status(200)
        .json({ message: "Teachers fetched successfully", data });
    })
    .catch((error) => next(error));
};

exports.getTeacher = (request, response, next) => {
  teacherSchema
    .findOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Student doesn't Exist!");

      response
        .status(200)
        .json({ message: "Teacher fetched successfully", object });
    })
    .catch((error) => next(error));
};

exports.addTeacher = (request, response, next) => {
  let object = new teacherSchema(request.body);
  object
    .save()
    .then((data) => {
      response
        .status(201)
        .json({ message: "Teacher added successfully", data });
    })
    .catch((error) => next(error));
};

exports.updateTeacher = (request, response, next) => {
  const id = request.params.id;
  const newData = request.body;

  teacherSchema
    .findByIdAndUpdate(id, newData, { new: true })
    .then((data) => {
      if (!data) throw new Error("Student doesn't Exist!");
      response.status(200).json({
        message: "Teacher updated successfully",
        data,
      });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (request, response, next) => {
  teacherSchema
    .deleteOne({ _id: request.params.id })
    .then((object) => {
      if (!object) throw new Error("Student doesn't Exist!");

      response
        .status(200)
        .json({ message: "Teacher deleted successfully", object });
    })
    .catch((error) => next(error));
};

exports.getClassSupervisors = (request, response, next) => {
  classSchema
    .find({})
    .populate({
      path: "supervisor",
      model: "teacher",
      select: { fullName: 1, email: 1 },
    })
    .then((data) => {
      response
        .status(200)
        .json({ message: "Supervisors fetched successfully", data });
    })
    .catch((error) => next(error));
};
