const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

// Get all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Create a new genre
router.post('/', async (req, res) => {
    // Validate user input
    const { error, value } = validate(req);

    // If validation fails, return error message
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Create a new Genre instance
    const genre = new Genre({ name: value.name });
    await genre.save(); 

    // Send the created genre back to the client
    res.send(genre);
});

// Update an existing genre
router.put('/:id', async (req, res) => {
    // Validate user input
    const { error, value } = validate(req);

    // If validation fails, return error message
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        // Find the genre by ID and update with validated data
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: value.name }, { new: true });

        // If the genre does not exist, return a 404 error
        if (!genre) {
            return res.status(404).send('The genre with the given ID does not exist');
        }

        // Send the updated genre back to the client
        res.send(genre);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
    try {
        // Find the genre by ID and remove
        const genre = await Genre.findByIdAndRemove(req.params.id);

        // If the genre does not exist, return a 404 error
        if (!genre) {
            return res.status(404).send('The genre with the given ID does not exist');
        }

        // Send the deleted genre back to the client
        res.send(genre);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Get a genre by ID
router.get('/:id', async (req, res) => {
    try {
        // Find genre by ID
        const genre = await Genre.findById(req.params.id);

        // If genre is not found, return 404 error
        if (!genre) {
            return res.status(404).send('The genre with the given ID does not exist');
        }

        // Send the found genre back to the client
        res.send(genre);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
