const courseRouter = require("express").Router();
const CourseController = require("../controllers/CourseController");
const PollController = require("../controllers/PollController");

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

courseRouter.get("/test/:year/:sem", async (req, res) => {
  const resp = await PollController.poll(10000);
  console.log(resp);
});

module.exports = courseRouter;
