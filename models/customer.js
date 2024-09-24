const Joi = require('joi'); // Added Joi for validation
const mongoose = require('mongoose');

// Customer model
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,  
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

// Customer validation function
const validateCustomer = (req) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(req.body);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
