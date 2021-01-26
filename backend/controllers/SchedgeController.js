const config = require("../utils/config");
const axios = require("axios");

class SchedgeController {
  static async getStatus(course) {
    const { year, sem, registrationNumber } = course;
    const resp = await axios.get(
      `${config.Schedge_URL}/${year}/${sem}/${registrationNumber}?full=true`
    );
    if (resp.data === undefined || resp.status !== 200) throw "Invalid params";
    return resp.data.status;
  }
}

module.exports = SchedgeController;
