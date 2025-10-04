// backend/routes/patients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Create a new patient
router.post('/', async (req, res) => {
    try {
        const { hospitalId, name, age, roomNumber, gender, condition } = req.body;
        
        if (!hospitalId || !name || !age || !roomNumber || !gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const patient = await Patient.create({
            hospitalId,
            name,
            age,
            roomNumber,
            gender,
            condition
        });

        res.status(201).json(patient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
});

// Get all patients with optional filters
router.get('/', async (req, res) => {
    try {
        const filters = {
            hospitalId: req.query.hospitalId,
            roomNumber: req.query.roomNumber,
            gender: req.query.gender
        };

        const patients = await Patient.findAll(filters);
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});

// Get a specific patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
});

// Update a patient
router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const patient = await Patient.update(req.params.id, updates);
        
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Failed to update patient' });
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.delete(req.params.id);
        
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully', patient });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
});

module.exports = router;