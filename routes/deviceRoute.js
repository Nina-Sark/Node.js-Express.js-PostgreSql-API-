require("express-async-errors");
const { Router } = require("express");
const DeviceControllers = require("../controllers/DeviceControllers");
const hasAccess = require("../middlewares/accessHandler");
const auth = require("../middlewares/auth");
const deviceRouter = Router();

deviceRouter
  .route("/")
  .post(auth, hasAccess(["admin"]), DeviceControllers.createNewDevice)
  .get(DeviceControllers.getAllDevices);

deviceRouter
  .route("/info")
  .post(auth, hasAccess(["admin"]), DeviceControllers.addDeviceInfo);

module.exports = deviceRouter;
