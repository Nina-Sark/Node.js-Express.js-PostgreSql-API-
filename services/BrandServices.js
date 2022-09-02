const db = require("../config/db");
const { CREATE_BRAND, GET_BRANDS } = require("../queries/brandQueries");

class BrandServices {
  static async createBrand(brandName) {
    const brand = await db.query(CREATE_BRAND, [brandName]);
    return brand?.rows?.[0];
  }

  static async getBrands() {
    const brands = await db.query(GET_BRANDS);
    return brands?.rows;
  }
}

module.exports = BrandServices;
