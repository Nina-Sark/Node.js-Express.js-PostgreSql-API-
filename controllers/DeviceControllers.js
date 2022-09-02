const { StatusCodes } = require("http-status-codes");
const DeviceServices = require("../services/DeviceServices");

class DeviceControllers {
  static async createNewDevice(req, res) {
    const { name, price, rating = 0, img, type_id, brand_id } = req.body;

    const device = await DeviceServices.createDevice([
      name,
      price,
      rating,
      img,
      type_id,
      brand_id,
    ]);

    res.status(StatusCodes.CREATED).json({ device });
  }

  static async getAllDevices(req, res) {
    const devices = await DeviceServices.getDevices(req.body);

    res.status(StatusCodes.OK).json({ devices });
  }

  static async addDeviceInfo(req, res) {
    const { data } = req.body;

    try {
      await DeviceServices.addInfo(data);
      res.status(StatusCodes.CREATED).json({ success: true, message : "Info added successfuly" })
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(error);
    }
  }
}

module.exports = DeviceControllers;
