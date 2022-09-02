const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  FIND_USER_BY_EMAIL,
  CREATE_USER,
  UPDATE_USER,
} = require("../queries/userQueries");

class UserServices {
  static async findUserByEmail(email) {
    const users = await db.query(FIND_USER_BY_EMAIL, [email]);
    return users?.rows?.[0];
  }

  static async comparePassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }

  static generateJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return token;
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async createUser(payload) {
    const user = await db.query(CREATE_USER, payload);
    console.log(user)
    return user?.rows?.[0];
  }
}

module.exports = UserServices;
