const mongoose = require("mongoose");

const coureSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    sem: {
        type: String,
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
    emails: [{
        _id: false,
        email: String
    }]
})

coureSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Course = mongoose.model(`Course`, coureSchema);

module.exports = Course;