const config = require("../utils/config");
const axios = require('axios');
class SchedgeController {
    static async getStatus(course) {
        const {year, sem, registrationNumber} = course;
        console.log(`${config.Schedge_URL}/2021/${sem}/${registrationNumber}?full=true`);
        const resp = await axios.get(`${config.Schedge_URL}/2021/${sem}/${registrationNumber}?full=true`);
        if(resp.data === undefined || resp.status !== 200) throw "Invalid params";
        return resp.data.status;
    }
}

module.exports = SchedgeController;