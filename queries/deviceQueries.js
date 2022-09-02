exports.CREATE_DEVICE =
  "INSERT INTO devices (name, price, rating, img, type_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING device_id, name, price, rating, img, type_id, brand_id";
exports.GET_DEVICES = "SELECT * FROM devices OFFSET $1 LIMIT $2";
exports.GET_DEVICES_BY_TYPE = "SELECT * FROM devices WHERE type_id = $1";
exports.GET_DEVICES_BY_BRAND = "SELECT * FROM devices WHERE brand_id = $1";
exports.GET_DEVICES_BY_TYPE_AND_BRAND =
  "SELECT * FROM devices WHERE type_id = $1 AND brand_id = $2";
exports.ADD_DEVICE_INFO =
  "INSERT INTO devices (device_id, title, description) VALUES ($1, $2, $3)";
