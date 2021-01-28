require('dotenv').config()

const PORT = process.env.PORT;
const SCHEDGE_URL = process.env.SCHEDGE_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {
  PORT,
  SCHEDGE_URL,
  MONGODB_URI,
  SENDGRID_API_KEY
}