const db = require("../config/db");
const {
  CREATE_TYPE,
  GET_TYPES,
  DELETE_TYPE,
  REMOVE_DEVICES_WITH_TYPE,
} = require("../queries/typeQueries");

class TypeServices {
  static async createType(typeName) {
    const type = await db.query(CREATE_TYPE, [typeName]);
    console.log(type);
    return type?.rows?.[0];
  }

  static async getTypes() {
    const types = await db.query(GET_TYPES);
    return types?.rows;
  }

  static async deleteType(name, id) {
    await db.query(REMOVE_DEVICES_WITH_TYPE, [id]);
    const type = await db.query(DELETE_TYPE, [name]);
    return type;
  }
}

module.exports = TypeServices;
