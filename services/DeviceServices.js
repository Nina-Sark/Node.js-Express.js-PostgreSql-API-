const db = require("../config/db");
const {
  CREATE_DEVICE,
  GET_DEVICES_BY_TYPE,
  GET_DEVICES_BY_BRAND,
  GET_DEVICES_BY_TYPE_AND_BRAND,
  GET_DEVICES,
  ADD_DEVICE_INFO,
} = require("../queries/deviceQueries");

class DeviceServices {
  static async createDevice(payload) {
    const newDevice = await db.query(CREATE_DEVICE, payload);
    return newDevice?.rows?.[0];
  }

  static async getDevices(payload = {}) {
    let page = payload?.page || 1;
    let limit = payload?.limit || 1;
    let offset = page * limit - limit;
    let devices = [];

    if (payload?.type && !payload?.brand) {
      devices = await db.query(GET_DEVICES_BY_TYPE, [payload?.type]);
    } else if (!payload?.type && payload?.brand) {
      devices = await db.query(GET_DEVICES_BY_BRAND, [payload?.brand]);
    } else if (payload?.type && payload?.brand) {
      devices = await db.query(GET_DEVICES_BY_TYPE_AND_BRAND, [
        payload?.type,
        payload?.brand,
      ]);
    } else {
      devices = await db.query(GET_DEVICES, [offset, limit]);
    }

    return devices?.rows;
  }

  static addInfo(data) {
    data?.forEach(async ({ device_id, title, description }) => {
      await db.query(ADD_DEVICE_INFO, [device_id, title, description]);
    });
  }
}

module.exports = DeviceServices;
