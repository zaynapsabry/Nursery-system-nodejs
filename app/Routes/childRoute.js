const express = require("express");
const controller = require("./../Controller/childController");
const router = express.Router();

router.route("/child").get(controller.getAllChilds).post(controller.addChild);

router
  .route("/child/:id")
  .get(controller.getChild)
  .patch(controller.updateChild)
  .delete(controller.deleteChild);

module.exports = router;
