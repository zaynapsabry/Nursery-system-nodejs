const express = require("express");
const controller = require("./../Controller/classController");
const router = express.Router();

router.route("/class/child/:id").get(controller.getClassChildrenInfo);
router.route("/class/teacher/:id").get(controller.getClassTeacherInfo);
router.route("/class").get(controller.getAllClasses).post(controller.addClass);
router
  .route("/class/:id")
  .post(controller.addClassChild)
  .get(controller.getClass)
  .patch(controller.updateClass)
  .delete(controller.deleteClass);

module.exports = router;
