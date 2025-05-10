import express from 'express';
import Marks from '../models/marks.js';

const router = express.Router();

// Add or update marks for a student
router.post('/', async (req, res) => {
  try {
    const { student, math, science, english, attendance } = req.body;
    let marks = await Marks.findOne({ student });
    if (marks) {
      marks.math = math;
      marks.science = science;
      marks.english = english;
      marks.attendance = attendance;
      marks.updatedAt = Date.now();
      await marks.save();
      return res.status(200).json({ success: true, data: marks });
    } else {
      marks = new Marks({ student, math, science, english, attendance });
      await marks.save();
      return res.status(201).json({ success: true, data: marks });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get marks for a student
router.get('/:studentId', async (req, res) => {
  try {
    const marks = await Marks.findOne({ student: req.params.studentId });
    if (!marks) return res.status(404).json({ success: false, message: 'Marks not found' });
    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all marks (for teacher dashboard)
router.get('/', async (req, res) => {
  try {
    const marks = await Marks.find().populate('student', 'name email');
    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
