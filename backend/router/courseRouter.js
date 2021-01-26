const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");

courseRouter.post(
  "/addCourse/:year/:sem/:registrationNumber",
  async (req, res) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, courseName } = req.body;
    if (
      !year ||
      !sem ||
      !registrationNumber ||
      !status ||
      !email ||
      !courseName
    )
      return res.status(400).json("Invalid params");

    try {
      await CourseController.upsertCourse(
        year,
        sem,
        registrationNumber,
        status,
        email,
        courseName
      );
    } catch (error) {
      return res.status(400).json("Fail to insert");
    }
    return res.status(201).send("Course successfully added!");
  }
);

courseRouter.delete(
  "/removeCourse/:year/:sem/:registrationNumber",
  async (req, res) => {
    const { year, sem, registrationNumber } = req.params;
    const { status, email, courseName } = req.body;
    if (
      !year ||
      !sem ||
      !registrationNumber ||
      !status ||
      !email ||
      !courseName
    )
      return res.status(400).json("Invalid params");

    try {
      await CourseController.remove(
        year,
        sem,
        registrationNumber,
        status,
        email,
        courseName,
      );
    } catch (e) {
      console.log(e.message);
      return res.status(400).json("Fail to remove");
    }
    return res.status(200).json("Deleted successfully");
  }
);

module.exports = courseRouter;
