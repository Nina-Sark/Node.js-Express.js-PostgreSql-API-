require("express-async-errors");
const { Router } = require("express");
const BrandControllers = require("../controllers/BrandControllers");
const hasAccess = require("../middlewares/accessHandler");
const auth = require("../middlewares/auth");
const brandRouter = Router();

brandRouter
  .route("/")
  .post(auth, hasAccess(["admin"]), BrandControllers.createNewBrand)
  .get(BrandControllers.getAllBrands);

module.exports = brandRouter;
