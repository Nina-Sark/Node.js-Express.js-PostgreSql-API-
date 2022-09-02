const { StatusCodes } = require("http-status-codes");
const UserServices = require("../services/UserServices");

class UserControllers {
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await UserServices.findUserByEmail(email);
    console.log(user);

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Email or password is wrong. Try again.");
    }

    const isPasswordValid = await UserServices.comparePassword(
      password,
      user?.password
    );

    if (!isPasswordValid) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Email or password is wrong. Try again.");
    }

    const token = UserServices.generateJWT({
      id: user?.user_id,
      email: user?.email,
    });

    res.status(StatusCodes.OK).json({
      user: {
        user_id: user?.user_id,
        email: user?.email,
        role: user?.role,
      },
      token,
    });
  }

  static async registerUser(req, res) {
    const { email, password, role = "user" } = req.body;
    const userExists = await UserServices.findUserByEmail(email);

    if (userExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("This email is already in use.");
    }

    const hashedPassword = await UserServices.hashPassword(password);
    const newUser = await UserServices.createUser([
      email,
      hashedPassword,
      role,
    ]);

    console.log(newUser);
    const token = UserServices.generateJWT({
      id: newUser?.user_id,
      email: newUser?.email,
    });

    res
      .status(StatusCodes.CREATED)
      .json({
        user: { user_id: newUser?.user_id, email: newUser?.email, role: newUser?.role },
        token,
      });
  }
}

module.exports = UserControllers;
