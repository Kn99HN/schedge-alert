const SchedgeController = require("../controllers/SchedgeController");
const CourseController = require("../controllers/CourseController");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const config = require('../utils/config');

async function send(course, emails) {
  const { year, sem, registrationNumber, name, currentStatus } = course;
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
    to: emails, // list of receivers
    subject: "Hello", // Subject line
    text: `${name} (${registrationNumber} ${sem}-${year}) has changed status to ${currentStatus}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;
}

async function checkStatuses(year, sem) {
  const courses = await CourseController.getAllCourses({
    year,
    sem,
  });

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
    const emailResp = Promise.all(filteredCourses.forEach(async (course) => {
      return await send(course, course.emails);
    }));
    return emailResp;
  } catch (error) {
    throw new Error(error);
  }
}

// need to open connection with mongodb through mongoose first -> Write a wrapper class for this
checkStatuses(2020, 'sp');
