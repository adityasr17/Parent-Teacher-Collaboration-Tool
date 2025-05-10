import express from 'express';
import Teacher from '../models/teacher.js';

const router = express.Router();

// Registration endpoint for teacher
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        const teacher = new Teacher({ name, email, password });
        await teacher.save();
        res.status(201).json({ success: true, data: teacher });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login endpoint for teacher
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
        // For demo: password is not hashed, just check if it matches a field (not secure)
        if (teacher.password && teacher.password === password) {
            return res.status(200).json({ success: true, data: teacher });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create a new teacher
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    try {
        const teacher = new Teacher({ name, email });
        await teacher.save();
        res.status(201).json({ success: true, data: teacher });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get a teacher by ID
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        res.status(200).json({ success: true, data: teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update a teacher
router.put('/:id', async (req, res) => {
    const { name, email } = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        res.status(200).json({ success: true, data: updatedTeacher });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
