const { StatusCodes } = require("http-status-codes");
const BrandServices = require("../services/BrandServices");

class BrandControllers {
  static async createNewBrand(req, res) {
    const { brandName } = req.body;

    const brand = await BrandServices.createBrand(brandName);

    res.status(StatusCodes.CREATED).json({ brand });
  }

  static async getAllBrands(req, res) {
    const brands = await BrandServices.getBrands();
    res.status(StatusCodes.OK).json({ brands });
  }
}

module.exports = BrandControllers;
