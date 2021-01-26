const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");
const { ErrorHelper } = require("../utils/error_helper");

courseRouter.put(
  "/addCourse/:year/:sem/:registrationNumber",
  async (req, res, next) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, courseName } = req.body;
    try {
      if (
        !year ||
        !sem ||
        !registrationNumber ||
        !status ||
        !email ||
        !courseName
      )
        throw new ErrorHelper(400, "Bad Request", ["Invalid Params"]);
      const resp = await CourseController.upsertCourse(
        year,
        sem,
        registrationNumber,
        status,
        email,
        courseName
      );
      return res.status(200).send("Successful");
    } catch (e) {
      return next(e);
    }
  }
);

courseRouter.delete(
  "/removeCourse/:year/:sem/:registrationNumber",
  async (req, res, next) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, courseName } = req.body;

    try {
      if (
        !year ||
        !sem ||
        !registrationNumber ||
        !status ||
        !email ||
        !courseName
      )
        throw new ErrorHelper(400, "Bad Request", ["Invalid Params"]);
      const resp = await CourseController.remove(
        year,
        sem,
        registrationNumber,
        status,
        email,
        courseName
      );
      if(!resp) throw new ErrorHelper(400, "Bad Request", ["There is no course as requested"]);
      return res.status(200).send("Removed successfully!");
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = courseRouter;
