const config = require('./utils/config');
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require("mongoose");
const courseRouter = require('./router/courseRouter');
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/courses/', courseRouter);

module.exports = app

// app.use(middleware.requestLogger)
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)