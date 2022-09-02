exports.CREATE_BRAND =
  "INSERT INTO brands (name) VALUES ($1) RETURNING brand_id, name";
exports.GET_BRANDS = "SELECT * FROM brands";
