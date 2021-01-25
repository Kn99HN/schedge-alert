const mongoose = require("mongoose");
const Course = require("../models/course");

class CourseController {
  static async getCourse(req) {
    const { year, sem, registrationNumber, email } = req;
    if (
      year == null ||
      sem == null ||
      registrationNumber == null ||
      email == null
    ) {
      throw "Invalid parameters";
    } else {
      const resp = await Course.find({
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
      }).exec();
      return [...Set(resp.map((doc) => doc.emails))];
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
      const savedCourse = new Course({
        registrationNumber: registrationNumber,
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
        name: name,
        emails: [email],
      });
      Course.findOneAndUpdate(
        { year: year, sem: sem, registrationNumber: registrationNumber },
        {
          $push: {
            emails: {
              $not: {
                $elemMatch: {
                  email: email,
                },
              },
            },
          },
        },
        { safe: true, upsert: true },
        function (err, model) {
          console.log(err);
        }
      );
    }
  }

  static async removeFromCourse(req, res) {
    const { year, sem, registrationNumber, email } = req;
    if (
      year == null ||
      sem == null ||
      registrationNumber == null ||
      email == null
    ) {
      throw "Invalid parameters";
    } else {
      Course.findOneAndUpdate(
        { year: year, sem: sem, registrationNumber: registrationNumber },
        {
          $pull: {
            emails: {
              $elemMatch: {
                email: email,
              },
            },
          },
        },
        { multi: true },
        function (err, model) {
          console.log(err);
        }
      );
    }
  }
}

module.exports = CourseController;
