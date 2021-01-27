const config = require("../utils/config");
const axios = require("axios");
const { ErrorHelper } = require("../utils/error_helper");

class SchedgeController {
  static async getStatus(course) {
    const { year, sem, registrationNumber } = course;
    const resp = await axios.get(
      `${config.Schedge_URL}/${year}/${sem}/${registrationNumber}?full=true`
    );
    if (resp.data === undefined || resp.status !== 200)
      throw new ErrorHelper(resp.status, "Bad Request", [
        `Course reg.no: ${registrationNumber}, year: ${year}, sem: ${sem} not found`,
      ]);
    return resp.data.status;
  }
}

module.exports = SchedgeController;
