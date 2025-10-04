// backend/routes/hospitals.js
const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

// Create a new hospital
router.post('/', async (req, res) => {
    try {
        const { hospitalId, name, floorCount } = req.body;
        
        if (!hospitalId || !name || !floorCount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hospital = await Hospital.create({ hospitalId, name, floorCount });
        res.status(201).json(hospital);
    } catch (error) {
        console.error('Error creating hospital:', error);
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Hospital ID already exists' });
        }
        res.status(500).json({ error: 'Failed to create hospital' });
    }
});

// Get all hospitals
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.findAll();
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
});

// Get a specific hospital by database ID
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        res.json(hospital);
    } catch (error) {
        console.error('Error fetching hospital:', error);
        res.status(500).json({ error: 'Failed to fetch hospital' });
    }
});

// Get hospital by hospital ID
router.get('/by-hospital-id/:hospitalId', async (req, res) => {
    try {
        const hospital = await Hospital.findByHospitalId(req.params.hospitalId);
        
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        res.json(hospital);
    } catch (error) {
        console.error('Error fetching hospital:', error);
        res.status(500).json({ error: 'Failed to fetch hospital' });
    }
});

// Update a hospital
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const hospital = await Hospital.update(req.params.id, updates);
        
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        res.json(hospital);
    } catch (error) {
        console.error('Error updating hospital:', error);
        res.status(500).json({ error: 'Failed to update hospital' });
    }
});

// Delete a hospital
router.delete('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.delete(req.params.id);
        
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        res.json({ message: 'Hospital deleted successfully', hospital });
    } catch (error) {
        console.error('Error deleting hospital:', error);
        res.status(500).json({ error: 'Failed to delete hospital' });
    }
});

// Get patient count for a hospital
router.get('/:id/patients/count', async (req, res) => {
    try {
        const count = await Hospital.getPatientsCount(req.params.id);
        res.json({ count });
    } catch (error) {
        console.error('Error fetching patient count:', error);
        res.status(500).json({ error: 'Failed to fetch patient count' });
    }
});

module.exports = router;