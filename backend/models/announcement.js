import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
