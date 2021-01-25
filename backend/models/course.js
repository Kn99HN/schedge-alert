const mongoose = require("mongoose");

const coureSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        required: true,
    },
    sem: {
        type: Number,
        required: true,
    },
    registrationNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    emails: [String]
})

coureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Course = mongoose.model('Course', coureSchema);

module.exports = Course;