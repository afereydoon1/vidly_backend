const Joi = require('joi'); // Added Joi for validation
const mongoose = require('mongoose');

// Genre model
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

// Genre validation function
const validateGenre = (req) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    return schema.validate(req.body);
};

exports.Genre = Genre;
exports.validate = validateGenre;
