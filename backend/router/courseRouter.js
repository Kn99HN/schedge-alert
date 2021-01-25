const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");

courseRouter.post("/addCourse/:year/:sem/:registrationNumber", (req, res) => {
  const { year, sem, registrationNumber } = req.params;
  const { email, courseName } = req.body;

  CourseController.addCourse(
    {
      year,
      sem,
      registrationNumber,
      email,
      name: courseName
    },
    res
  );
  return res.status(201);
});

courseRouter.delete("/deleteCourse/:year/:sem/:registrationNumber", (req, res) => {
  const { year, sem, registrationNumber } = req.params;
  const { email, courseName } = req.body;

  CourseController.removeFromCourse(
    {
      year,
      sem,
      registrationNumber,
      email,
      name: courseName
    },
    res
  );
  return res.status(201);
});

courseRouter.get("/getCourse/:year/:sem/:registrationNumber", async (req, res) => {
  const { year, sem, registrationNumber } = req.params;

  const emails = await CourseController.getCourse(
    {
      year,
      sem,
      registrationNumber,
    }
  );
  return res.status(200).json(emails);
});

module.exports = courseRouter;
