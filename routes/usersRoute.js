require("express-async-errors");
const { Router } = require("express");
const UserControllers = require("../controllers/UserControllers");
const userRouter = Router();

userRouter.post("/login", UserControllers.loginUser);
userRouter.post("/register", UserControllers.registerUser);

module.exports = userRouter;
