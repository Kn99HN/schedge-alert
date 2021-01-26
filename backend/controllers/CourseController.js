const Course = require("../models/Course");

class CourseController {
  static async getAllCourses(year, sem) {
    const resp = await Course.find().lean().exec();
    const filteredCourses = resp.filter((doc) => {
      return doc.year === year && doc.sem === sem;
    });
    return filteredCourses;
  }

  static async getCourse(year, sem, registrationNumber) {
    return await Course.findOne({
      year: year,
      sem: sem,
      registrationNumber: registrationNumber,
    })
      .orFail()
      .exec();
  }

  static async upsertCourse(
    year,
    sem,
    registrationNumber,
    status,
    email,
    name
  ) {
    await Course.findOneAndUpdate(
      {
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
        name: name,
        status: status,
      },
      {
        $addToSet: {
          emails: {
            email: email,
          },
        },
      },
      { safe: true, upsert: true },
      (err, model) => {
        if (err) console.log(err);
      }
    );
  }

  static async remove(year, sem, registrationNumber, status, email, name) {
    await Course.findOneAndUpdate(
      {
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
        status: status,
        name: name,
      },
      {
        $pull: {
          emails: {
            email: email,
          },
        },
      },
      { multi: true, new: true },
      (err, model) => {
        if (err) console.log(err);
        if (model.emails.length === 0) {
          model.remove();
        }
      }
    );
  }

  static async updateStatus(year, sem, registrationNumber, status, currentStatus, name) {
    await Course.updateMany(
      {
        year: year,
        sem: sem,
        registrationNumber: registrationNumber,
        status: status,
        name: name,
      },
      {
        $set: {
          status: currentStatus,
        },
      }
    ).orFail();
  }
}

module.exports = CourseController;
