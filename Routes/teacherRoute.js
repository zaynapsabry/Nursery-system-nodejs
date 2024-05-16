const express = require("express");
const controller = require("./../Controller/teacherController");
const router = express.Router();

router.route("/teachers/supervisors").get(controller.getClassSupervisors);

router
  .route("/teachers")
  .get(controller.getAllTeachers)
  .post(controller.addTeacher);

router
  .route("/teachers/:id")
  .get(controller.getTeacher)
  .patch(controller.updateTeacher)
  .delete(controller.deleteTeacher);

module.exports = router;
