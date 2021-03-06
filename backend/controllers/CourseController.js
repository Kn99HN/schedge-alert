const Course = require("../models/course");

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
    const resp = await Course.findOneAndUpdate(
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
      { safe: true, upsert: true }
    );
    return resp;
  }

  static async remove(year, sem, registrationNumber, status, email, name) {
    const resp = await Course.findOneAndUpdate(
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
      { multi: true, new: true }
    );
    return resp;
  }

  static async updateStatus({
    year,
    sem,
    registrationNumber,
    status,
    currentStatus,
    name,
  }) {
    const resp = await Course.updateMany(
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
    );
    return resp;
  }
}

module.exports = CourseController;
