require('dotenv').config()

const PORT = process.env.PORT;
const Schedge_URL = process.env.Schedge_URL;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  Schedge_URL,
  MONGODB_URI
}