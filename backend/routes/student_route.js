import express from 'express';
import Student from '../models/student.js';

const router = express.Router();

// Registration endpoint for student
router.post('/register', async (req, res) => {
    const { name, email, password, usn, phone } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        const student = new Student({ name, email, password, usn, phone });
        await student.save();
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email or USN already exists' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login endpoint for student
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
        // For demo: password is not hashed, just check if it matches a field (not secure)
        if (student.password && student.password === password) {
            return res.status(200).json({ success: true, data: student });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create a new student
router.post('/', async (req, res) => {
    const { name, email, usn, phone, attendance } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    try {
        const student = new Student({ name, email, usn, phone, attendance });
        await student.save();
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email or USN already exists' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { name, email, usn, phone, attendance } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, email, usn, phone, attendance }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: updatedStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
