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
      const resp = await Course.findById(
        `${registrationNumber}-${year}-${sem}`
      ).exec();
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
        _id: `${registrationNumber}-${year}-${sem}`,
        registrationNumber: registrationNumber,
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
        emails: [email],
      });
      savedCourse.findByIdAndUpdate(
        savedCourse._id,
        {
          $push: {
            emails: {
              $not: {
                $elemMatch: {
                  email,
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
      const id = `${registrationNumber}-${year}-${sem}`;
      savedCourse.findByIdAndUpdate(
        id,
        {
          $pull: {
            emails: {
              $elemMatch: {
                email,
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
