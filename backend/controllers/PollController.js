const SchedgeController = require("./SchedgeController");
const CourseController = require("./CourseController");

class PollController {
  static async poll(interval) {
    const courses = await CourseController.getAllCourses({
      year: 2020,
      sem: 'sp',
    });
    console.log("Poll...");
    try {
      const coursesToSent = new Map();
      const statuses = await Promise.all(
        courses.map(async (course) => {
          const status = await SchedgeController.getStatus(course);
          return {
            year: course.year,
            sem: course.sem,
            registrationNumber: course.registrationNumber,
            status: status,
          };
        })
      );
      statuses
        .filter((status) => status.status !== "Closed")
        .forEach((status) => {
          const key = `${status.registrationNumber}-${status.year}-${status.sem}`;
          if (!coursesToSent.has(key)) {
            coursesToSent[key] = {
              status: status.status,
            };
          }
        });
      return statuses;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PollController;
