require("express-async-errors");
const { Router } = require("express");
const TypeControllers = require("../controllers/TypeControllers");
const hasAccess = require("../middlewares/accessHandler");
const auth = require("../middlewares/auth");
const typeRouter = Router();

typeRouter
  .route("/")
  .post(auth, hasAccess(["admin"]), TypeControllers.createNewType)
  .get(TypeControllers.getAllTypes);

typeRouter.delete("/remove", auth, hasAccess(["admin"]), TypeControllers.removeType);

module.exports = typeRouter;
