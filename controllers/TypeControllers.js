const { StatusCodes } = require("http-status-codes");
const TypeServices = require("../services/TypeServices");

class TypeControllers {
  static async createNewType(req, res) {
    const { typeName } = req.body;

    const type = await TypeServices.createType(typeName);
    console.log(type);

    res.status(StatusCodes.CREATED).json({ type });
  }

  static async getAllTypes(req, res) {
    const types = await TypeServices.getTypes();
    res.status(StatusCodes.OK).json({ types });
  }

  static async removeType(req, res) {
    const {
      query: { name, id },
    } = req;

    try {
      const type = await TypeServices.deleteType(name, id);
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Type successfuly deleted." });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(err);
    }
  }
}

module.exports = TypeControllers;
