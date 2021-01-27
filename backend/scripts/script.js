const mongoose = require("mongoose");
const SchedgeController = require("../controllers/schedgeController");
const CourseController = require("../controllers/courseController");
const config = require("../utils/config");
const nodemailer = require("nodemailer");

const semester = {
  sp: "Spring",
  su: "Summer",
  fa: "Fall",
  ja: "January",
};

async function send({
  year,
  sem,
  registrationNumber,
  name,
  status,
  currentStatus,
  emails,
}) {
  const emls = emails.map((email) => email.email);
  if (emls.length === 0 || !emls) throw new Error("No recipients");
  const receivers = emls.join(",");
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"test" <test@example.com>', // sender address
    to: receivers, // list of receivers
    subject: "Hello", // Subject line
    text: `Course: ${name} with registration number: ${registrationNumber} for ${semester[sem]}-${year} has changed status from ${status} to ${currentStatus}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;
}

async function checkStatuses(year, sem) {
  const courses = await CourseController.getAllCourses(year, sem);

  console.log("Checking...");
  try {
    const coursesWithStatus = await Promise.all(
      courses.map(async (course) => {
        const status = await SchedgeController.getStatus(course);
        return {
          ...course,
          currentStatus: status,
        };
      })
    );
    const filteredCourses = coursesWithStatus.filter(
      (course) => course.status !== course.currentStatus
    );
    if (filteredCourses.length === 0) {
      console.log("Empty array...No new update");
    } else {
      const emailResp = Promise.all(
        filteredCourses.map(async (course) => {
          return Promise.all(
            await send(course),
            await CourseController.updateStatus(course)
          );
        })
      );
      return emailResp;
    }
  } catch (error) {
    throw new Error(error);
  }
}

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
try {
  checkStatuses(2021, "sp");
} catch(e) {
  console.log(e);
}
