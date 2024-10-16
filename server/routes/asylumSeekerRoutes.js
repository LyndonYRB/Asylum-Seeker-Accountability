//routes/asylumSeekerRoutes.js
const express = require('express');
const router = express.Router();
const asylumSeekerController = require('../controllers/asylumSeekerController');

// POST request to create a new asylum seeker
router.post('/', asylumSeekerController.createAsylumSeeker);

// GET request to get all asylum seekers
router.get('/', asylumSeekerController.getAllAsylumSeekers);

// GET request to get a specific asylum seeker by ID
router.get('/:id', asylumSeekerController.getAsylumSeekerById);

// PUT request to update an asylum seeker
router.put('/:id', asylumSeekerController.updateAsylumSeeker);

// DELETE request to delete an asylum seeker
router.delete('/:id', asylumSeekerController.deleteAsylumSeeker);

// Check-out an asylum seeker
router.put('/:id/checkout', asylumSeekerController.checkOut);

// Check-in an asylum seeker
router.put('/:id/checkin', asylumSeekerController.checkIn);


module.exports = router;
