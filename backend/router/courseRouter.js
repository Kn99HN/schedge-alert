const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");
const { ErrorHelper } = require("../utils/error_helper");
const logger = require("../utils/logger");
const util = require('../utils/util');

courseRouter.post(
  "/course/:year/:sem/:registrationNumber",
  async (req, res, next) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, name } = req.body;
    try {
      if (
        !year ||
        !sem ||
        !registrationNumber ||
        !status ||
        !email ||
        !name ||
        !(sem in util.semester)
      )
        throw new ErrorHelper(400, "Bad Request", ["Invalid Params"]);
      const resp = await CourseController.upsertCourse(
        year,
        sem,
        registrationNumber,
        status,
        email,
        name
      );
      if (resp) {
        logger.info(
          `Course with registration number ${registrationNumber} is created with email: ${email}`
        );
        return res.status(201).send("Successful");
      } else {
        logger.info(
          `Course with registration number ${registrationNumber} is updated with email: ${email}`
        );
        return res.status(200).send("Successful");
      }
    } catch (e) {
      return next(e);
    }
  }
);

courseRouter.delete(
  "/course/:year/:sem/:registrationNumber",
  async (req, res, next) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, name } = req.body;

    try {
      if (
        !year ||
        !sem ||
        !registrationNumber ||
        !status ||
        !email ||
        !name ||
        !(sem in util.semester)
      )
        throw new ErrorHelper(400, "Bad Request", ["Invalid Params"]);
      const resp = await CourseController.remove(
        year,
        sem,
        registrationNumber,
        status,
        email,
        name
      );
      if (!resp)
        throw new ErrorHelper(400, "Bad Request", [
          "There is no course as requested",
        ]);
      return res.status(200).send("Removed successfully!");
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = courseRouter;
