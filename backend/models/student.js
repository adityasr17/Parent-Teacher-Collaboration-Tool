import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  usn: { type: String, unique: true },
  phone: { type: String },
  attendance: { type: Number },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;
