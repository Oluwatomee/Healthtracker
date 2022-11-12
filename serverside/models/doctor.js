const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    contact: String,
    email: String,
    specialization: String,
    medical_center: String, 
    location: String,
    years_of_practice: String 
});

module.exports = mongoose.model('Doctor', doctorSchema);