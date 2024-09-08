const mongoose = require('mongoose');
const db = require('../config/db')
const studentSchema = new mongoose.Schema(
    {
        // timestamp,random value, 
        _id : mongoose.Schema.Types.ObjectId, 
        'name': {type : String}, 
        'age': {type : Number}, 
        'location': {type : String}, 
        'school_name': {type : String}

    }
)
module.exports = mongoose.model('students', studentSchema)