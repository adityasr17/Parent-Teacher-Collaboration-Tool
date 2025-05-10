import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  math: { type: Number, required: true },
  science: { type: Number, required: true },
  english: { type: Number, required: true },
  attendance: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Marks = mongoose.model('Marks', MarksSchema);
export default Marks;
