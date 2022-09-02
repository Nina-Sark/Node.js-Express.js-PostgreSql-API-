const { StatusCodes } = require("http-status-codes");
const UserServices = require("../services/UserServices");

const hasAccess = (roles) => {
  return async (req, res, next) => {
    const { email } = req.user;

    const user = await UserServices.findUserByEmail(email);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("Something went wrong.");
    }

    if (!roles.includes(user?.role)) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("You don't have access to these resources.");
    }

    next();
  };
};

module.exports = hasAccess;
