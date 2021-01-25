const mongoose = require("mongoose");
const Course = require("../models/course");

class CourseController {
  static async getCourse(req) {
    const { year, sem, registrationNumber } = req;
    if (
      year == null ||
      sem == null ||
      registrationNumber == null
    ) {
      throw "Invalid parameters";
    } else {
      const resp = await Course.findOne({
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
      }).exec();
      return [...new Set(resp.emails.map((doc) => doc.email))];
    }
  }

  static async addCourse(req, res) {
    const { year, sem, registrationNumber, name, email } = req;
    if (
      year == null ||
      sem == null ||
      registrationNumber == null ||
      email == null
    ) {
      throw "Invalid parameters";
    } else {
      Course.findOneAndUpdate(
        {
          year: year,
          sem: sem,
          registrationNumber: registrationNumber,
          name: name,
          emails: {
            $elemMatch: {
              $ne: { email: email },
            },
          },
        },
        {
          $addToSet: {
            emails: {
              email: email,
            },
          },
        },
        { safe: true, upsert: true },
        function (err, model) {
          if (err) console.log(err);
        }
      );
    }
  }

  static async removeFromCourse(req, res) {
    const { year, sem, registrationNumber, email, name } = req;
    if (
      year == null ||
      sem == null ||
      registrationNumber == null ||
      email == null
    ) {
      throw "Invalid parameters";
    } else {
      return Course.findOneAndUpdate(
        {
          year: year,
          sem: sem,
          registrationNumber: registrationNumber,
          name: name,
        },
        {
          '$pull': {
            emails: {
              email: email,
            },
          },
        },
        { multi: true },
        (err, model) => {
          if (err) console.log(err);
          if (model.emails.length === 0) {
            model.remove();
          }
        }
      );
    }
  }
}

module.exports = CourseController;
