exports.CREATE_TYPE =
  "INSERT INTO types (name) VALUES ($1) RETURNING type_id, name";
exports.GET_TYPES = "SELECT * FROM types";
exports.DELETE_TYPE = "DELETE FROM types WHERE name = $1";
exports.REMOVE_DEVICES_WITH_TYPE = "DELETE FROM devices WHERE type_id = $1"
