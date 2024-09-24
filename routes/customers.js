const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// Create a new customer
router.post('/', async (req, res) => {
    // Validate user input
    const { error, value } = validate(req);

    // If validation fails, return error message
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Create and save a new customer instance
    const customer = new Customer({ 
        name: value.name,
        phone: value.phone,
        isGold: value.isGold
    });
    await customer.save();

    // Send the created customer back to the client
    res.send(customer);
});

// Update an existing customer
router.put('/:id', async (req, res) => {
    // Validate user input
    const { error, value } = validate(req);

    // If validation fails, return error message
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        // Find the customer by ID and update with validated data
        const customer = await Customer.findByIdAndUpdate(req.params.id, 
            { 
                name: value.name,
                phone: value.phone,
                isGold: value.isGold
            },
            { new: true }
        );

        // If the customer does not exist, return a 404 error
        if (!customer) {
            return res.status(404).send('The customer with the given ID does not exist');
        }

        // Send the updated customer back to the client
        res.send(customer);
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
